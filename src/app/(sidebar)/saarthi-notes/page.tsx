"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileVideo, Download, Play, Volume2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function SaarthiNotesPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [transcript, setTranscript] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    // Check file size (200MB limit)
    if (file.size > 200 * 1024 * 1024) {
      alert("File size must be less than 200MB")
      return
    }

    // Check file type
    const allowedTypes = ["video/mp4", "video/avi", "video/mov", "video/wmv", "video/flv", "video/webm"]
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid video file (MP4, AVI, MOV, WMV, FLV, WebM)")
      return
    }

    setUploadedFile(file)
    startProcessing()
  }

  const startProcessing = () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setIsComplete(true)
          // Simulate transcript generation
          setTranscript(`यह एक नमूना ट्रांसक्रिप्ट है जो वीडियो की सामग्री को दर्शाता है।

मुख्य बिंदु:
• गणित की मूल बातें
• बीजगणित के सिद्धांत
• समीकरणों को हल करना
• व्यावहारिक उदाहरण

विस्तृत नोट्स:
1. पहले हमने चर्चा की कि कैसे संख्याओं के साथ काम करना है
2. फिर हमने देखा कि बीजगणितीय व्यंजकों को कैसे सरल बनाया जाता है
3. अंत में, हमने कुछ व्यावहारिक समस्याओं को हल किया

यह ट्रांसक्रिप्ट आपकी मूल भाषा में तैयार किया गया है और आप इसे डाउनलोड कर सकते हैं।`)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const downloadTranscript = () => {
    const element = document.createElement("a")
    const file = new Blob([transcript], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `saarthi-notes-${uploadedFile?.name || "transcript"}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setIsProcessing(false)
    setProcessingProgress(0)
    setTranscript("")
    setIsComplete(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-1 via-brand-2 to-brand-3 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Saarthi-Notes</h1>
          <p className="text-blue-500 text-lg">
            Transform your video lectures into detailed notes in your native language
          </p>
        </div>

        {/* Main Upload Card */}
        {!uploadedFile && (
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Upload Video Lecture</CardTitle>
              <CardDescription className="text-gray-600">
                Upload your video lecture and get AI-generated notes in your native language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FileVideo className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Drop your video here or click to browse</h3>
                <p className="text-gray-600 mb-6">Supports MP4, AVI, MOV, WMV, FLV, WebM (Max 200MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Video File
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    AI Powered
                  </Badge>
                  <p className="text-gray-600 text-sm mt-2">Advanced AI transcription technology</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Native Language
                  </Badge>
                  <p className="text-gray-600 text-sm mt-2">Notes in your preferred language</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Instant Download
                  </Badge>
                  <p className="text-gray-600 text-sm mt-2">Download notes immediately</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing/Results Grid */}
        {uploadedFile && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Video Processing */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <FileVideo className="mr-2 h-5 w-5" />
                  Video Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <Play className="mx-auto h-12 w-12 text-gray-500 mb-2" />
                      <p className="text-gray-900">{uploadedFile.name}</p>
                      <p className="text-gray-600 text-sm">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                    </div>
                  </div>

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600 text-sm">
                        <span>Processing...</span>
                        <span>{processingProgress}%</span>
                      </div>
                      <Progress value={processingProgress} className="bg-gray-200" />
                    </div>
                  )}

                  {isComplete && (
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Processing Complete
                    </div>
                  )}

                  <Button
                    onClick={resetUpload}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Upload New Video
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right: Transcript Preview */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Transcript Preview
                  </span>
                  {isComplete && (
                    <Button onClick={downloadTranscript} size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isProcessing && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Generating transcript...</p>
                    </div>
                  )}

                  {isComplete && (
                    <Textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="min-h-[400px] bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 resize-none"
                      placeholder="Transcript will appear here..."
                    />
                  )}

                  {!isProcessing && !isComplete && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="mx-auto h-12 w-12 mb-4" />
                      <p>Transcript will appear here after processing</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feature Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Volume2 className="mx-auto h-8 w-8 text-gray-400 mb-3" />
              <h3 className="text-gray-900 font-semibold mb-2">Audio Recognition</h3>
              <p className="text-gray-600 text-sm">Advanced AI recognizes speech in multiple languages and dialects</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <FileText className="mx-auto h-8 w-8 text-gray-400 mb-3" />
              <h3 className="text-gray-900 font-semibold mb-2">Smart Notes</h3>
              <p className="text-gray-600 text-sm">Converts speech to structured notes with key points and summaries</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Download className="mx-auto h-8 w-8 text-gray-400 mb-3" />
              <h3 className="text-gray-900 font-semibold mb-2">Instant Download</h3>
              <p className="text-gray-600 text-sm">Download your notes in text format for offline study</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
