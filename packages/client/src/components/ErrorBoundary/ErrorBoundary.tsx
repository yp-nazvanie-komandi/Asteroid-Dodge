import { Component, type ErrorInfo, type ReactNode } from 'react'

interface IErrorBoundaryState {
  error: unknown
}

interface IErrorBoundaryProps {
  children: ReactNode
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props)

    this.state = { error: undefined }
  }

  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error({
      error,
      errorComponentStack: errorInfo.componentStack,
    })
  }

  render() {
    if (!this.state.error) {
      return this.props.children
    }

    if (import.meta.env?.DEV) {
      return (
        <pre>
          {JSON.stringify(
            this.state.error instanceof Error
              ? this.state.error.message
              : this.state.error,
            null,
            2
          )}
        </pre>
      )
    }

    if (typeof window === 'undefined') {
      return <div>Произошла ошибка</div>
    } else {
      // TODO: нужно будет глянуть че по SSRу
      window.location.replace('/error')
    }
  }
}
