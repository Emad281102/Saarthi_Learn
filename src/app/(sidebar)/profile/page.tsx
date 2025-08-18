"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Calendar, BookOpen, Trophy, Clock, Edit, Camera, Save, Award, Target } from "lucide-react"

const userProfile = {
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  location: "Rajasthan, India",
  joinDate: "2023-12-01",
  bio: "Passionate learner from rural Rajasthan, pursuing education in Mathematics and Science through Saarthi-Learn platform.",
  avatar: "/student-avatar.png",
  preferredLanguage: "Hindi",
  education: "Class 10th Student",
  interests: ["Mathematics", "Science", "Computer Skills"],
}

const learningStats = {
  totalCourses: 6,
  completedCourses: 3,
  totalHours: 67,
  certificates: 3,
  currentStreak: 7,
  longestStreak: 15,
  averageScore: 87,
  rank: 42,
}

const recentAchievements = [
  {
    title: "Math Master",
    description: "Completed Mathematics Fundamentals with 95% score",
    date: "2024-01-15",
    icon: Trophy,
  },
  {
    title: "Consistent Learner",
    description: "Maintained 7-day learning streak",
    date: "2024-01-14",
    icon: Target,
  },
  {
    title: "Certificate Collector",
    description: "Earned 3rd course certificate",
    date: "2024-01-12",
    icon: Award,
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userProfile)

  const handleSave = () => {
    // Save profile data logic here
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-1 to-brand-2 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-blue-100">Manage your account and learning preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="stats">Learning Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <div className="relative mx-auto">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src={formData.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-brand-1 text-white text-2xl">
                      {formData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-brand-1 hover:bg-brand-2"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="mt-4">{formData.name}</CardTitle>
                <p className="text-sm text-gray-600">{formData.education}</p>
                <Badge variant="outline" className="mt-2">
                  {formData.preferredLanguage}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Joined {new Date(formData.joinDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className={isEditing ? "bg-brand-1 hover:bg-brand-2" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level</Label>
                    <Input
                      id="education"
                      value={formData.education}
                      onChange={(e) => handleInputChange("education", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <select
                      id="language"
                      value={formData.preferredLanguage}
                      onChange={(e) => handleInputChange("preferredLanguage", e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Hindi">हिंदी</option>
                      <option value="English">English</option>
                      <option value="Bengali">বাংলা</option>
                      <option value="Tamil">தமிழ்</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About Me</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-brand-1" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-1">{learningStats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">{learningStats.completedCourses} completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <Clock className="h-4 w-4 text-brand-2" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-2">{learningStats.totalHours}h</div>
                <p className="text-xs text-muted-foreground">Total learning time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Target className="h-4 w-4 text-brand-3" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-3">{learningStats.currentStreak}</div>
                <p className="text-xs text-muted-foreground">days in a row</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{learningStats.averageScore}%</div>
                <p className="text-xs text-muted-foreground">Rank #{learningStats.rank}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Learning Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-1 mb-2">{learningStats.certificates}</div>
                  <p className="text-sm text-gray-600">Certificates Earned</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-2 mb-2">{learningStats.longestStreak}</div>
                  <p className="text-sm text-gray-600">Longest Streak (days)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-3 mb-2">#{learningStats.rank}</div>
                  <p className="text-sm text-gray-600">Current Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAchievements.map((achievement, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Course Completion Master</span>
                  <span className="text-sm text-gray-500">3/5 courses</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-brand-1 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Study Time Champion</span>
                  <span className="text-sm text-gray-500">67/100 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-brand-2 h-2 rounded-full" style={{ width: "67%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
