"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Copy,
  Trash2,
  GripVertical,
  Type,
  AlignLeft,
  CheckSquare,
  Circle,
  ChevronDown,
  Eye,
  Send,
  Palette,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

type QuestionType = "short-answer" | "paragraph" | "multiple-choice" | "checkboxes" | "dropdown"

interface Option {
  id: string
  text: string
}

interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  required: boolean
  options?: Option[]
}

interface FormData {
  title: string
  description: string
  questions: Question[]
}

const questionTypes = [
  { value: "short-answer", label: "Short answer", icon: Type },
  { value: "paragraph", label: "Paragraph", icon: AlignLeft },
  { value: "multiple-choice", label: "Multiple choice", icon: Circle },
  { value: "checkboxes", label: "Checkboxes", icon: CheckSquare },
  { value: "dropdown", label: "Dropdown", icon: ChevronDown },
]

export default function GoogleFormsClone() {
  const [form, setForm] = useState<FormData>({
    title: "Untitled form",
    description: "",
    questions: [],
  })

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [draggedQuestion, setDraggedQuestion] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [generatedFormData, setGeneratedFormData] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [forkformsCommand, setForkformsCommand] = useState<string | null>(null)

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: "Untitled Question",
      required: false,
      options:
        type === "multiple-choice" || type === "checkboxes" || type === "dropdown"
          ? [{ id: "1", text: "Option 1" }]
          : undefined,
    }

    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
    setSelectedQuestion(newQuestion.id)
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    }))
  }

  const deleteQuestion = (id: string) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
    setSelectedQuestion(null)
  }

  const duplicateQuestion = (id: string) => {
    const question = form.questions.find((q) => q.id === id)
    if (question) {
      const newQuestion = {
        ...question,
        id: Date.now().toString(),
        title: question.title + " (Copy)",
      }
      setForm((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }))
    }
  }

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    const newQuestions = [...form.questions]
    const [movedQuestion] = newQuestions.splice(fromIndex, 1)
    newQuestions.splice(toIndex, 0, movedQuestion)

    setForm((prev) => ({
      ...prev,
      questions: newQuestions,
    }))
  }

  const moveQuestionUp = (index: number) => {
    if (index > 0) {
      moveQuestion(index, index - 1)
    }
  }

  const moveQuestionDown = (index: number) => {
    if (index < form.questions.length - 1) {
      moveQuestion(index, index + 1)
    }
  }

  const handleDragStart = (e: React.DragEvent, questionId: string) => {
    setDraggedQuestion(questionId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedQuestion) {
      const dragIndex = form.questions.findIndex((q) => q.id === draggedQuestion)
      if (dragIndex !== -1 && dragIndex !== dropIndex) {
        moveQuestion(dragIndex, dropIndex)
      }
    }

    setDraggedQuestion(null)
    setDragOverIndex(null)
  }

  const addOption = (questionId: string) => {
    const question = form.questions.find((q) => q.id === questionId)
    if (question && question.options) {
      const newOption = {
        id: Date.now().toString(),
        text: `Option ${question.options.length + 1}`,
      }
      updateQuestion(questionId, {
        options: [...question.options, newOption],
      })
    }
  }

  const updateOption = (questionId: string, optionId: string, text: string) => {
    const question = form.questions.find((q) => q.id === questionId)
    if (question && question.options) {
      updateQuestion(questionId, {
        options: question.options.map((opt) => (opt.id === optionId ? { ...opt, text } : opt)),
      })
    }
  }

  const removeOption = (questionId: string, optionId: string) => {
    const question = form.questions.find((q) => q.id === questionId)
    if (question && question.options && question.options.length > 1) {
      updateQuestion(questionId, {
        options: question.options.filter((opt) => opt.id !== optionId),
      })
    }
  }

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "short-answer":
        return <Input placeholder="Short answer text" disabled />
      case "paragraph":
        return <Textarea placeholder="Long answer text" disabled />
      case "multiple-choice":
        return (
          <RadioGroup>
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} disabled />
                <Label>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "checkboxes":
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox disabled />
                <Label>{option.text}</Label>
              </div>
            ))}
          </div>
        )
      case "dropdown":
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      default:
        return null
    }
  }

  const handleCreateComponent = async () => {
    const formData = {
      title: form.title,
      description: form.description,
      questions: form.questions.map((question, index) => ({
        id: question.id,
        order: index + 1,
        type: question.type,
        title: question.title,
        description: question.description,
        required: question.required,
        options: question.options || null,
      })),
      totalQuestions: form.questions.length,
      createdAt: new Date().toISOString(),
    }

    setGeneratedFormData(formData)

    console.log("\n=== COMPLETE FORM DATA ===")

    const senddata = async (formData: any) => {
      setIsLoading(true)
      setForkformsCommand(null)
      try {
        const response = await fetch("/api/createcomponent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("API response:", result);
        return result;
      } catch (error) {
        console.error("Error sending data:", error);
        alert("Failed to send data: " + error);
      }
    };

    //await senddata(formData);

    const result = await senddata(formData);
    setIsLoading(false);

    if (result && result.componentName) {
      setForkformsCommand(`npx forkforms add ${result.componentName}`)
    } else {
      setForkformsCommand("An error occurred. No filename returned.")
    }
  }

  const renderQuestionEditor = (question: Question, index: number) => {
    const isSelected = selectedQuestion === question.id
    const isDraggedOver = dragOverIndex === index
    const isDragging = draggedQuestion === question.id

    return (
      <Card
        key={question.id}
        className={`mb-4 transition-all duration-200 ${isSelected ? "ring-2 ring-[#4D774E] shadow-lg border-[#4D774E]" : "border-[#90C695]/30"
          } ${isDraggedOver ? "border-[#4D774E] border-2 border-dashed" : ""} ${isDragging ? "opacity-50 scale-95" : ""
          } bg-white/90 backdrop-blur-sm`}
        onClick={() => setSelectedQuestion(question.id)}
        draggable
        onDragStart={(e) => handleDragStart(e, question.id)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col gap-2">
              <GripVertical className="h-5 w-5 text-[#4D774E]/60 cursor-move hover:text-[#164A41]" />
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveQuestionUp(index)
                  }}
                  disabled={index === 0}
                  className="h-6 w-6 p-0 hover:bg-[#E1B564]/20 text-[#4D774E]"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveQuestionDown(index)
                  }}
                  disabled={index === form.questions.length - 1}
                  className="h-6 w-6 p-0 hover:bg-[#E1B564]/20 text-[#4D774E]"
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex gap-4">
                <Input
                  value={question.title}
                  onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                  className="text-lg font-medium border-0 border-b-2 border-[#90C695]/50 rounded-none px-0 focus:border-[#4D774E] bg-transparent"
                  placeholder="Question"
                />

                <Select
                  value={question.type}
                  onValueChange={(value: QuestionType) => {
                    const hasOptions = value === "multiple-choice" || value === "checkboxes" || value === "dropdown"
                    updateQuestion(question.id, {
                      type: value,
                      options: hasOptions ? [{ id: "1", text: "Option 1" }] : undefined,
                    })
                  }}
                >
                  <SelectTrigger className="w-48 border-[#90C695]/50 focus:border-[#4D774E]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#90C695]/50">
                    {questionTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <SelectItem key={type.value} value={type.value} className="hover:bg-[#E1B564]/10">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-[#4D774E]" />
                            {type.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Options editor for multiple choice, checkboxes, dropdown */}
              {(question.type === "multiple-choice" ||
                question.type === "checkboxes" ||
                question.type === "dropdown") && (
                  <div className="space-y-2 ml-6">
                    {question.options?.map((option, optionIndex) => (
                      <div key={option.id} className="flex items-center gap-2">
                        {question.type === "multiple-choice" && <Circle className="h-4 w-4 text-[#4D774E]/60" />}
                        {question.type === "checkboxes" && <CheckSquare className="h-4 w-4 text-[#4D774E]/60" />}
                        {question.type === "dropdown" && (
                          <span className="text-sm text-[#4D774E]/70">{optionIndex + 1}.</span>
                        )}

                        <Input
                          value={option.text}
                          onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                          className="border-0 border-b border-[#90C695]/50 rounded-none px-2 py-1 focus:border-[#4D774E] bg-transparent"
                          placeholder={`Option ${optionIndex + 1}`}
                        />

                        {question.options && question.options.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeOption(question.id, option.id)} className="hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addOption(question.id)}
                      className="ml-6 text-[#4D774E] hover:text-[#164A41] hover:bg-[#E1B564]/20"
                    >
                      Add option
                    </Button>
                  </div>
                )}

              {/* Question preview */}
              <div className="mt-4">{renderQuestionPreview(question)}</div>
            </div>
          </div>

          {/* Question actions */}
          {isSelected && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#90C695]/30">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => duplicateQuestion(question.id)}
                  className="hover:bg-[#E1B564]/20 text-[#4D774E]"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteQuestion(question.id)}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor={`required-${question.id}`} className="text-sm text-[#4D774E]">
                  Required
                </Label>
                <Switch
                  id={`required-${question.id}`}
                  checked={question.required}
                  onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#164A41] via-[#4D774E] to-[#90C695]">
      {/* Header */}
      <div className="bg-[#164A41]/95 backdrop-blur-md border-b border-[#4D774E]/30 px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E1B564] to-[#E1B564]/80 rounded-lg flex items-center justify-center shadow-md">
              <div className="w-4 h-4 bg-[#164A41] rounded-sm"></div>
            </div>
            <Input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="text-lg font-medium border-0 bg-transparent focus:bg-[#164A41]/20 rounded-md px-2 text-white placeholder:text-white/70"
            />
          </div>

          {/* <div className="flex items-center gap-2"> */}
          {/*   <Button variant="ghost" size="sm" className="hover:bg-[#E1B564]/20 text-white hover:text-[#E1B564]"> */}
          {/*     <Palette className="h-4 w-4 mr-2" /> */}
          {/*     Customize theme */}
          {/*   </Button> */}
          {/*   <Button variant="ghost" size="sm" className="hover:bg-[#E1B564]/20 text-white hover:text-[#E1B564]"> */}
          {/*     <Eye className="h-4 w-4 mr-2" /> */}
          {/*     Preview */}
          {/*   </Button> */}
          {/*   <Button */}
          {/*     size="sm" */}
          {/*     className="bg-gradient-to-r from-[#E1B564] to-[#E1B564]/90 hover:from-[#E1B564]/90 hover:to-[#E1B564]/80 text-[#164A41] shadow-md font-semibold" */}
          {/*   > */}
          {/*     <Send className="h-4 w-4 mr-2" /> */}
          {/*     Send */}
          {/*   </Button> */}
          {/* </div> */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Form header */}
        <Card className="mb-6 shadow-lg bg-white/90 backdrop-blur-sm border-[#90C695]/30">
          <CardContent className="p-6">
            <div
              className="border-l-4 pl-6"
              style={{ borderLeftColor: "#E1B564" }}
            >
              <Input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="text-3xl font-normal border-0 px-0 mb-2 focus:bg-[#E1B564]/10 rounded-md bg-transparent text-[#164A41]"
                placeholder="Form title"
              />
              <Textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                className="border-0 px-0 resize-none focus:bg-[#E1B564]/10 rounded-md bg-transparent text-[#4D774E]"
                placeholder="Form description"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        {form.questions.map((question, index) => renderQuestionEditor(question, index))}

        {/* Add question buttons */}
        <Card className="shadow-lg bg-white/90 backdrop-blur-sm border-[#90C695]/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 flex-wrap">
              {questionTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Button
                    key={type.value}
                    variant="outline"
                    onClick={() => addQuestion(type.value as QuestionType)}
                    className="flex items-center gap-2 border-[#90C695]/50 hover:bg-[#E1B564]/20 hover:border-[#4D774E] text-[#164A41] hover:text-[#164A41]"
                  >
                    <Icon className="h-4 w-4" />
                    {type.label}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Create Component Button */}
        {form.questions.length > 0 && (
          <Card className="shadow-md mt-6">
            <CardContent className="p-6 text-center">
              <Button
                onClick={handleCreateComponent}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md px-8 py-3 text-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Component
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Generate your form component with {form.questions.length} question
                {form.questions.length !== 1 ? "s" : ""}
              </p>
              {forkformsCommand && (
                <div className="mt-4 bg-gray-100 rounded p-4 text-left">
                  <div className="mb-2 text-gray-700 font-medium">Run this command in your terminal:</div>
                  <code className="bg-gray-200 px-3 py-2 rounded font-mono text-emerald-700 text-lg block">{forkformsCommand}</code>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {/* Floating add button */}
        <div className="fixed right-6 bottom-6">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-xl bg-gradient-to-r from-[#E1B564] to-[#E1B564]/90 hover:from-[#E1B564]/90 hover:to-[#E1B564]/80 text-[#164A41] border-2 border-[#164A41]/20"
            onClick={() => addQuestion("short-answer")}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
