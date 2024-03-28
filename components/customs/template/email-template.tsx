import * as React from 'react';

interface EmailTemplateProps {
    username: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    username,
}) => (
    <>
        <div style={{ backgroundColor: '#1C1E1E', alignItems: 'left', display: 'flex', flexDirection: 'column' }}>
            <div>
                <img src="https://drive.google.com/file/d/1ZZGGYmooXf2ZlbUH1hfPfqwy8cY5LGqO/view" alt="Template Image" />
            </div>
            <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '24px', color: 'white' }}>
                    Dear Rare One,
                    <br /><br />
                    Congratulations! We&apos;re thrilled to inform you that your .MTPX username; {username} has
                    been successfully secured. 🎉
                    <br /><br />
                    <p style={{ color: 'white' }}>
                        We&apos;ll keep you posted and send a reminder as soon as it&apos;s ready for redemption. In the
                        meantime, check out the custom flyer we&apos;ve designed for you to share on your social media.
                    </p>
                </p>
                <a href=''>
                    <button style={{ backgroundColor: '#2063F2', cursor: 'pointer', paddingBlock: '16px', paddingInline: '10px' }}>Get My Exclusive Flyer</button>
                </a>
                <p style={{ marginTop: '24px', color: 'white' }}>
                    Thank you for joining us on this exciting journey!
                    <br /><br />
                    Best regards,
                    <br />
                    The Mintyplex Team ✨💎
                </p>
            </div>
        </div>

    </>
);
