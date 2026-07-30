type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'danger'
  testId? : string
}

export function SubmitButton({ children, variant = 'primary', testId}: Props) {
  const colorClass = variant === 'danger'
    ? 'bg-red-600 hover:bg-red-500'
    : 'bg-blue-600 hover:bg-blue-500'

    return (
      <button 
        type="submit"
        data-testid={testId}
        className={`${colorClass} text-white rounded px-4 py-2 w-fit`}
      >
      {children}
      </button>
      )
}

