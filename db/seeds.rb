puts "Seeding 🌱🌱🌱" 

if Baker.all.length < 1
    ashley = Baker.create(first_name: "Ashley", last_name: "Simiyu", email: "jaynasimiyu@gmail.com", password: "1234", password_confirmation: "1234")
end

if Discount.all.length < 1
    noDiscount = Discount.create(name: "No discount", description: "The product has no discount", discount_percent: 0.0)
end

if VariantGroup.all.length < 1
    noVariantGroup = VariantGroup.create(name: "No variant group")
end

if Customer.all.length < 1
    pascal = Customer.create(first_name: "Pascal", last_name: "Odudigbo", email: "odudigbopascal@gmail.com", password: "1234567890", password_confirmation: "1234567890", verified: true)
end

puts "Done seeding 🪴🪴🪴!"