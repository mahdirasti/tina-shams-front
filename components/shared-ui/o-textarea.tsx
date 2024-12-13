"use client"
import { Textarea, TextareaProps } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"

type Props = TextareaProps & {
  label?: string
  helperText?: string | boolean
  hasError?: boolean
  required?: boolean
  onInputChange?: (value: string) => void
  onSend?: (value: string) => void
  removeText?: boolean
  defaultValue?: string
}

export default function OrgTextarea({
  label,
  helperText,
  hasError,
  required = false,
  removeText = false,
  onInputChange,
  onSend,
  onKeyDown,
  defaultValue,
  ...rest
}: Props) {
  const [text, setText] = useState<string>("")
  useEffect(() => {
    if (defaultValue !== undefined) setText(defaultValue)
  }, [defaultValue])
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    // Adjust the height of the textarea dynamically based on its content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto" // Reset the height first
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Adjust height based on scroll height
    }
  }, [text])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault() // Prevent new line on Enter without Shift
      if (onSend) onSend(text)
      if (removeText) setText("")
    }
  }

  let placeholder = rest?.placeholder
  let inputClasss = rest?.className ?? ""
  let helperTextClss = "text-sm font-normal text-black/60"

  if (hasError) {
    inputClasss += ` border-2 !ring-red-500 border-red-500`
    helperTextClss += ` !font-medium text-red-500`
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {label && (
        <div className="flex flex-row items-center gap-x-1">
          <strong className="font-semibold text-black/[.87] text-base">
            {label}
          </strong>
          {!!required && <span className="text-red-500">*</span>}
        </div>
      )}
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          const value = e.target.value
          setText(value)
          if (onInputChange) onInputChange(value)
        }}
        onKeyDown={handleKeyDown}
        className={inputClasss}
        placeholder={placeholder}
      />
      {helperText && (
        <span data-testid="hint-text" className={helperTextClss}>
          {helperText}
        </span>
      )}
    </div>
  )
}
