"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useToast } from "../ui/use-toast";

interface Product {
  id: string; // Assumed type; adjust as necessary (could be number)
  Name: string;
  ID: string;
  CoverImage: any;
  UserId: string;
  Discount: number;
  Price: number;
  quantity?: number; 
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product, quantityAdded: number | string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    // Initialize state from local storage at the start
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  const { toast } = useToast();

  const handleAddSuccess = () => {
    toast({
      description: "Product added successfully",
    });
  };

  const addToCart = useCallback(
    (product: Product, quantityAdded: number | string) => {
      setCartItems((currentItems) => {
        const updatedItems = currentItems.find((item) => item.ID === product.ID)
          ? currentItems.map((item) =>
              item.ID === product.ID
                ? {
                    ...item,
                    quantity:
                      Number(quantityAdded) +
                      Number(item?.quantity && item?.quantity),
                  }
                : item
            )
          : [...currentItems, { ...product, quantity: Number(quantityAdded) }];

        // Correctly update local storage after modifying the cart items
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedItems));
        }
        handleAddSuccess();
        return updatedItems;
      });
    },
    [setCartItems]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCartItems((currentItems) => {
        const updatedItems = currentItems.filter(
          (item) => item.ID !== productId
        );

        // Correctly update local storage after modifying the cart items
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedItems));
        }
        return updatedItems;
      });
    },
    [setCartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);

    // Correctly update local storage after clearing the cart items
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  }, [setCartItems]);

  // console.log(cartItems);

  const value = { cartItems, addToCart, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
