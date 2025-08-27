"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  BookOpen,
  Trophy,
  Clock,
  Target,
  Download,
  Play,
  CheckCircle,
  Star,
  CalendarIcon,
  TrendingUp,
  Award,
  FileText,
} from "lucide-react"
import Image from "next/image"

const enrolledCourses = [
  {
    id: 1,
    title: "Mathematics Fundamentals",
    instructor: "Dr. Rajesh Kumar",
    progress: 60,
    totalLessons: 24,
    completedLessons: 14,
    nextLesson: "Algebra Basics - Chapter 6",
    timeSpent: "12h 30m",
    lastAccessed: "2 hours ago",
    difficulty: "Beginner",
    language: "Hindi",
    image: "/logo.jpg",
  },
  {
    id: 2,
    title: "Basic Science Concepts",
    instructor: "Prof. Meera Sharma",
    progress: 35,
    totalLessons: 18,
    completedLessons: 6,
    nextLesson: "States of Matter",
    timeSpent: "8h 15m",
    lastAccessed: "1 day ago",
    difficulty: "Beginner",
    language: "Bengali",
    image: "/logo.jpg",
  },
  {
    id: 3,
    title: "Hindi Literature",
    instructor: "Ms. Kavita Joshi",
    progress: 80,
    totalLessons: 15,
    completedLessons: 12,
    nextLesson: "Poetry Analysis - Final Chapter",
    timeSpent: "15h 45m",
    lastAccessed: "3 hours ago",
    difficulty: "Intermediate",
    language: "Hindi",
    image: "/logo.jpg",
  },
]

const completedCourses = [
  {
    id: 1,
    title: "Computer Basics",
    instructor: "Mr. Amit Singh",
    completedDate: "2024-01-15",
    grade: "A+",
    certificateId: "CERT-001",
    timeSpent: "20h 30m",
    language: "Hindi",
    image: "/logo.jpg",
  },
  {
    id: 2,
    title: "English Communication",
    instructor: "Ms. Priya Patel",
    completedDate: "2024-01-08",
    grade: "A",
    certificateId: "CERT-002",
    timeSpent: "25h 15m",
    language: "English",
    image: "/logo.jpg",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Course Completed",
    description: "Completed your first course successfully",
    icon: Trophy,
    date: "2024-01-08",
    type: "milestone",
  },
  {
    id: 2,
    title: "Math Master",
    description: "Scored 90+ in 5 math assessments",
    icon: Target,
    date: "2024-01-12",
    type: "performance",
  },
  {
    id: 3,
    title: "Consistent Learner",
    description: "Maintained 7-day learning streak",
    icon: Star,
    date: "2024-01-15",
    type: "habit",
  },
  {
    id: 4,
    title: "Certificate Collector",
    description: "Earned 3 course certificates",
    icon: Award,
    date: "2024-01-15",
    type: "milestone",
  },
]

const studySchedule = [
  {
    date: new Date(2024, 0, 16),
    events: [
      { time: "10:00 AM", title: "Mathematics - Algebra Practice", type: "lesson" },
      { time: "2:00 PM", title: "Science Quiz", type: "assessment" },
    ],
  },
  {
    date: new Date(2024, 0, 17),
    events: [
      { time: "11:00 AM", title: "Hindi Literature Discussion", type: "live-session" },
      { time: "4:00 PM", title: "Math Assignment Due", type: "deadline" },
    ],
  },
]

const learningGoals = [
  {
    id: 1,
    title: "Complete Mathematics Course",
    progress: 60,
    target: 100,
    deadline: "2024-02-15",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Study 40 hours this month",
    progress: 36,
    target: 40,
    deadline: "2024-01-31",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Earn 5 certificates",
    progress: 3,
    target: 5,
    deadline: "2024-03-31",
    status: "in-progress",
  },
]

export default function MyLearningPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const totalTimeSpent = enrolledCourses.reduce((total, course) => {
    const hours = Number.parseFloat(course.timeSpent.split("h")[0])
    return total + hours
  }, 0)

  const totalCompletedTime = completedCourses.reduce((total, course) => {
    const hours = Number.parseFloat(course.timeSpent.split("h")[0])
    return total + hours
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-1 to-brand-2 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-neutral-700">My Learning Journey</h1>
        <p className="text-cyan-500">Track your progress and achieve your learning goals</p>
      </div>

      {/* Learning Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-brand-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-1">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">Active learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCourses.length}</div>
            <p className="text-xs text-muted-foreground">Courses finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-brand-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-3">{Math.round(totalTimeSpent + totalCompletedTime)}h</div>
            <p className="text-xs text-muted-foreground">Total learning time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{completedCourses.length}</div>
            <p className="text-xs text-muted-foreground">Earned certificates</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="current">Current Courses</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* Current Courses Tab */}
        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} width={400} height={192} className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.src = "/placeholder.svg" }} />
                  <Badge className="absolute top-2 right-2 bg-brand-1">{course.language}</Badge>
                  <div className="absolute bottom-2 left-2 right-2">
                    <Progress value={course.progress} className="h-2 mb-1" />
                    <p className="text-xs text-white">{course.progress}% Complete</p>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                    <span>{course.timeSpent}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Next: {course.nextLesson}</p>
                    <p className="text-xs text-gray-500">Last accessed: {course.lastAccessed}</p>
                  </div>
                  <Button className="w-full bg-brand-1 hover:bg-brand-2">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Courses Tab */}
        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} width={400} height={192} className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.src = "/placeholder.svg" }} />
                  <Badge className="absolute top-2 right-2 bg-green-600">Completed</Badge>
                  <Badge className="absolute top-2 left-2 bg-brand-1">{course.language}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium text-yellow-600">Grade: {course.grade}</span>
                    </div>
                    <span className="text-sm text-gray-600">{course.timeSpent}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Completed on: {new Date(course.completedDate).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      View Content
                    </Button>
                    <Button className="flex-1 bg-brand-1 hover:bg-brand-2">
                      <Download className="h-4 w-4 mr-2" />
                      Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      achievement.type === "milestone"
                        ? "bg-yellow-100 text-yellow-600"
                        : achievement.type === "performance"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Earned on: {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      achievement.type === "milestone"
                        ? "default"
                        : achievement.type === "performance"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {achievement.type}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md" />
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              {studySchedule.map((day, dayIndex) => (
                <Card key={dayIndex}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      {day.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-brand-1">{event.time}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.title}</p>
                          <Badge
                            variant="outline"
                            className={
                              event.type === "lesson"
                                ? "text-blue-600"
                                : event.type === "assessment"
                                  ? "text-red-600"
                                  : event.type === "live-session"
                                    ? "text-green-600"
                                    : "text-orange-600"
                            }
                          >
                            {event.type.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{goal.title}</span>
                    <Badge variant={goal.status === "completed" ? "default" : "secondary"}>{goal.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">
                        {goal.progress}/{goal.target}
                      </span>
                    </div>
                    <Progress value={(goal.progress / goal.target) * 100} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium">{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-brand-1" />
                    <span className="text-sm text-brand-1">
                      {Math.round((goal.progress / goal.target) * 100)}% Complete
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
