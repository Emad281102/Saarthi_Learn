import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Trophy, TrendingUp, MessageCircle, Play, Calendar, Target, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-1 to-brand-2 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-neutral-700">Welcome back, Priya!</h1>
            <p className=" text-lg text-cyan-500">Ready to continue your learning journey today?</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Learning Streak</p>
                  <p className="text-2xl font-bold">7 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-brand-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-1">24</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Trophy className="h-4 w-4 text-brand-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-2">8</div>
            <p className="text-xs text-muted-foreground">33% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-brand-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-3">42h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-brand-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-4">3</div>
            <p className="text-xs text-muted-foreground">+1 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-brand-1" />
                <span>Continue Learning</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-brand-1 rounded-lg flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Mathematics Basics</h3>
                  <p className="text-sm text-gray-600">Chapter 5: Algebra Fundamentals</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={60} className="flex-1" />
                    <span className="text-sm text-gray-500">60%</span>
                  </div>
                </div>
                <Button size="sm" className="bg-brand-1 hover:bg-brand-2">
                  Continue
                </Button>
              </div>

              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-brand-2 rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Science Fundamentals</h3>
                  <p className="text-sm text-gray-600">Chapter 3: Physics Basics</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={35} className="flex-1" />
                    <span className="text-sm text-gray-500">35%</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Continue
                </Button>
              </div>

              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-brand-3 rounded-lg flex items-center justify-center text-white font-bold">
                  H
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Hindi Literature</h3>
                  <p className="text-sm text-gray-600">Chapter 2: Poetry Analysis</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={80} className="flex-1" />
                    <span className="text-sm text-gray-500">80%</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-brand-1" />
                <span>Saarthi Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-brand-1">
                <p className="text-sm font-medium text-gray-900">Practice More Algebra</p>
                <p className="text-xs text-gray-600">You are doing great! Try 5 more problems to master this topic.</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm font-medium text-gray-900">New Course Available</p>
                <p className="text-xs text-gray-600">Advanced Mathematics is now available in Hindi.</p>
              </div>
              <Button className="w-full bg-transparent" variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask Saarthi
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-brand-2" />
                <span>Upcoming</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Math Quiz</p>
                  <p className="text-xs text-gray-600">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Science Assignment</p>
                  <p className="text-xs text-gray-600">Due in 3 days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Live Session</p>
                  <p className="text-xs text-gray-600">Friday, 4:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-brand-1" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Math Master</p>
                <p className="text-sm text-gray-600">Completed 10 math lessons</p>
              </div>
              <Badge variant="secondary">New</Badge>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Consistent Learner</p>
                <p className="text-sm text-gray-600">7-day learning streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-brand-2" />
              <span>Learning Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Complete Math Course</p>
                <span className="text-sm text-gray-500">8/10</span>
              </div>
              <Progress value={80} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Study 30 hours this month</p>
                <span className="text-sm text-gray-500">42/30</span>
              </div>
              <Progress value={100} />
              <p className="text-xs text-green-600 mt-1">Goal achieved! 🎉</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Earn 3 certificates</p>
                <span className="text-sm text-gray-500">3/3</span>
              </div>
              <Progress value={100} />
              <p className="text-xs text-green-600 mt-1">Goal achieved! 🎉</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
