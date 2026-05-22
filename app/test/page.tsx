"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Product = {
  id: string
  name: string
  short_description: string | null
  description: string | null
  price: number
  image_url: string | null
  flow_type: string | null
  size: string | null
  stock: number | null
}

export default function TestPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*")

      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (!error && data) {
        setProducts(data)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading products...</div>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products from Supabase</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "16px",
                maxWidth: "400px",
              }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    width: "200px",
                    height: "auto",
                    display: "block",
                    marginBottom: "12px",
                  }}
                />
              )}

              <h2>{product.name}</h2>
              <p>{product.short_description}</p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p>
                <strong>Flow:</strong> {product.flow_type || "N/A"}
              </p>
              <p>
                <strong>Size:</strong> {product.size || "N/A"}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock ?? 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}