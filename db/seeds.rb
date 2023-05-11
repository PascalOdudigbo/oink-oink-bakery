puts "Seeding 🌱🌱🌱" 

ashley = Baker.create(first_name: "Ashley", last_name: "Simiyu", email: "jaynasimiyu@gmail.com", password: "1234", password_confirmation: "1234")
noDiscount = Discount.create(name: "No discount", description: "The product has no discount", discount_percent: 0.0)
noVariantGroup = VariantGroup.create(name: "No variant group")
puts "Done seeding!"