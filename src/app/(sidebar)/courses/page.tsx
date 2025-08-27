"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Clock, Users, BookOpen, Play, Globe, TrendingUp, ChevronRight } from "lucide-react"
import Image from "next/image"

const categories = [
  { id: "all", name: "All Courses", count: 156 },
  { id: "mathematics", name: "Mathematics", count: 42 },
  { id: "science", name: "Science", count: 38 },
  { id: "languages", name: "Languages", count: 28 },
  { id: "social", name: "Social Studies", count: 24 },
  { id: "computer", name: "Computer Science", count: 18 },
  { id: "arts", name: "Arts & Crafts", count: 6 },
]

const courses = [
  {
    id: 1,
    title: "Mathematics Fundamentals",
    description: "Master the basics of mathematics with interactive lessons and practice problems.",
    instructor: "Dr. Rajesh Kumar",
    rating: 4.8,
    students: 1234,
    duration: "8 weeks",
    level: "Beginner",
    language: "Hindi",
    category: "mathematics",
    price: "Free",
    image: "/logo.jpg",
    progress: 60,
    enrolled: true,
    featured: true,
  },
  {
    id: 2,
    title: "Basic Science Concepts",
    description: "Explore the wonders of science through hands-on experiments and visual learning.",
    instructor: "Prof. Meera Sharma",
    rating: 4.7,
    students: 987,
    duration: "6 weeks",
    level: "Beginner",
    language: "Bengali",
    category: "science",
    price: "₹299",
    image: "/logo.jpg",
    progress: 0,
    enrolled: false,
    featured: true,
  },
  {
    id: 3,
    title: "English Communication Skills",
    description: "Improve your English speaking and writing skills for better opportunities.",
    instructor: "Ms. Priya Patel",
    rating: 4.9,
    students: 2156,
    duration: "10 weeks",
    level: "Intermediate",
    language: "English",
    category: "languages",
    price: "₹499",
    image: "/logo.jpg",
    progress: 0,
    enrolled: false,
    featured: false,
  },
  {
    id: 4,
    title: "Computer Basics",
    description: "Learn essential computer skills including typing, internet usage, and basic software.",
    instructor: "Mr. Amit Singh",
    rating: 4.6,
    students: 756,
    duration: "4 weeks",
    level: "Beginner",
    language: "Hindi",
    category: "computer",
    price: "Free",
    image: "/logo.jpg",
    progress: 0,
    enrolled: false,
    featured: false,
  },
  {
    id: 5,
    title: "Indian History & Culture",
    description: "Discover the rich heritage and history of India through engaging storytelling.",
    instructor: "Dr. Kavita Joshi",
    rating: 4.5,
    students: 543,
    duration: "12 weeks",
    level: "Intermediate",
    language: "Tamil",
    category: "social",
    price: "₹399",
    image: "/logo.jpg",
    progress: 0,
    enrolled: false,
    featured: false,
  },
  {
    id: 6,
    title: "Creative Arts & Crafts",
    description: "Express your creativity through traditional and modern art techniques.",
    instructor: "Ms. Sunita Devi",
    rating: 4.4,
    students: 321,
    duration: "6 weeks",
    level: "Beginner",
    language: "Hindi",
    category: "arts",
    price: "₹199",
    image: "/logo.jpg",
    progress: 0,
    enrolled: false,
    featured: false,
  },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [levelFilter, setLevelFilter] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = levelFilter === "all" || course.level.toLowerCase() === levelFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesLevel
  })

  const featuredCourses = courses.filter((course) => course.featured)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-1 to-brand-2 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-neutral-700">Explore Courses</h1>
        <p className="text-cyan-500">Discover knowledge in your native language with AI-powered learning</p>
      </div>

      {/* Featured Courses */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-brand-1" />
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-brand-1/20"
            >
              <div className="relative">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} width={400} height={192} className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.src = "/placeholder.svg" }} />
                <Badge className="absolute top-2 right-2 bg-brand-1">Featured</Badge>
                {course.enrolled && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-xs text-white mt-1">{course.progress}% Complete</p>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    <Globe className="h-3 w-3 mr-1" />
                    {course.language}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-brand-1">{course.price}</p>
                    <p className="text-xs text-gray-500">{course.instructor}</p>
                  </div>
                  <Button
                    className={course.enrolled ? "bg-brand-2 hover:bg-brand-3" : "bg-brand-1 hover:bg-brand-2"}
                    size="sm"
                  >
                    {course.enrolled ? (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Continue
                      </>
                    ) : (
                      "Enroll Now"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses, topics, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-brand-1 hover:bg-brand-2" : ""}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedCategory === "all" ? "All Courses" : categories.find((c) => c.id === selectedCategory)?.name}
            <span className="text-gray-500 ml-2">({filteredCourses.length} courses)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} width={400} height={192} className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.src = "/placeholder.svg" }} />
                <Badge
                  className={`absolute top-2 left-2 ${
                    course.level === "Beginner"
                      ? "bg-green-500"
                      : course.level === "Intermediate"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                >
                  {course.level}
                </Badge>
                <Badge variant="secondary" className="absolute top-2 right-2">
                  <Globe className="h-3 w-3 mr-1" />
                  {course.language}
                </Badge>
                {course.enrolled && course.progress > 0 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-xs text-white mt-1">{course.progress}% Complete</p>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-brand-1 text-lg">{course.price}</p>
                    <p className="text-xs text-gray-500">{course.instructor}</p>
                  </div>
                  <Button
                    className={course.enrolled ? "bg-brand-2 hover:bg-brand-3" : "bg-brand-1 hover:bg-brand-2"}
                    size="sm"
                  >
                    {course.enrolled ? (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Continue
                      </>
                    ) : (
                      <>
                        Enroll
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
