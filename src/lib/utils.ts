import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



interface ActionData {
  error?: boolean
  message?: string
}

export function actionToast({ actionData }: { actionData: ActionData }) {
  if (!actionData) return

  if (actionData.error) {
    return toast.error(actionData.message || "Something went wrong")
  } else {
    return toast.success("Course created successfully!")
  }
}
