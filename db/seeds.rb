# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create(title: "Going to gym", description: "location: xxx", completed: false, due: "2020-01-13", tags:"healthy fitness Jack")
Task.create(title: "Hanging out with Jack", description: "Restaurant: xxx", completed: true, due: "2020-02-11", tags:"social Jack")
Task.create(title: "Meet the boos", description: "bring the file: xxx", completed: false, due: "2020-01-13", tags:"work boss")
Task.create(title: "CS2040S", description: "Utown Auditorium 2", completed: false, due: "2020-03-10", tags:"Computer-Science")

p "created 4 tasks!"
