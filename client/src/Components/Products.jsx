import React from 'react'

function Products() {
    const products = [
        {id: 1, name: "Chocolate Cake", description: "A lovely spongy Chocolete delicacy", image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/easy_chocolate_cake-b62f92c.jpg?quality=90&webp=true&resize=300,272", price: "$34"},
        {id: 2, name: "Vanilla Cake", description: "A lovely spongy Vanilla delicacy", image: "https://www.recipetineats.com/wp-content/uploads/2020/08/My-best-Vanilla-Cake_9.jpg?resize=650,910", price: "$34"},
        {id: 3, name: "Caramel Cake", description: "A lovely spongy Caramel delicacy", image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/caramel_cake-5374396.jpg?quality=90&webp=true&resize=300,272", price: "$34"},
        {id: 4, name: "Oreo Cake", description: "A lovely spongy Oreo delicacy", image: "https://preppykitchen.com/wp-content/uploads/2017/03/Cookies-and-Cream-Cake-3-feature.jpg", price: "$34"},
        {id: 5, name: "BlueBerry Cake", description: "A lovely spongy Blueberry delicacy", image: "https://buttermilkbysam.com/wp-content/uploads/2021/06/blueberry-cake-10.jpg",  price: "$34"}
    ]
  return (
    <div className='productsContainer'>
      {products.map(product=><Product key={product.id} product={product}/>)}
    </div>
  )
}

export default Products;