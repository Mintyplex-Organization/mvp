import { Resend } from 'resend';
import { EmailTemplate } from '~/components/customs/template/email-template';
import dbConnect from '~/lib/db';
import Waitlist from '~/models/waitlist';
import { NextResponse } from "next/server";


export async function POST(req, res) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await dbConnect(); // Connect to the database

        console.log('Request body:', req.body);
        
        // Destructure email and username from the request body
        const { email, username } = req.body;
        

     // if (!email || typeof email !== 'string') {
        //     return NextResponse.json({ message: "Email is required and must be strings." }, { status: 400 });
        // }
        // if (!username || typeof username !== 'string') {
        //     return NextResponse.json({ message: "Username is required and must be strings." }, { status: 400 });
        // }

        // Check for existing email in the waitlist
        const existingEmail = await Waitlist.findOne({ email: email.toLowerCase() });
        if (existingEmail) {
            // return res.status(409).json({ message: 'This email is already on the waitlist.' });
            return NextResponse.json({ message: "This email is already on the waitlist." }, { status: 400 });
        }

        // Check for existing username in the waitlist
        const existingUsername = await Waitlist.findOne({ username: username.toLowerCase() });
        if (existingUsername) {
            return res.status(409).json({ message: 'This username is already taken.' });
        }

        // Create a new waitlist entry
        const waitlist = new Waitlist({ email: email.toLowerCase(), username: username.toLowerCase() });
        await waitlist.save(); // Save the waitlist entry to the database

        // Send an email using Resend
        const data = await resend.emails.send({
            from: 'no-reply <hello@mintyplex.com>',
            to: [`${email}`],
            subject: 'Waitlist',
            text: 'testing',
            react: EmailTemplate({ username: username.toLowerCase() }),
        });

        // Respond with a success message
        // res.status(200).json({ message: 'You have been added to the waitlist and an email has been sent!' });
        return NextResponse.json({ message: "You have been added to the waitlist and an email has been sent!" }, { status: 200 }, data);

    } catch (error) {
        console.error('Error subscribing to waitlist or sending email:', error);
        // res.status(500).json({ message: 'An error occurred during the subscription process.' });
        return NextResponse.json({ message: 'An error occurred during the subscription process.' }, error, { status: 500 });
    }
}
