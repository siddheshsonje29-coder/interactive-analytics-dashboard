import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { toggleApiErrorSimulation } from '../../services/api';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary intercepted render crash:", error, errorInfo);
  }

  handleReset = () => {
    // Disable simulated API errors to recover from the crash loop
    toggleApiErrorSimulation(false);
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-rose-200/50 bg-rose-50/50 p-8 text-center backdrop-blur-sm dark:border-rose-950/20 dark:bg-rose-950/5">
          <BiErrorCircle className="text-5xl text-rose-500 animate-pulse mb-4" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Component Render Crash</h3>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400 mb-6">
            {this.state.error?.message || 'A JavaScript exception occurred during UI composition.'}
          </p>
          <div className="flex gap-4">
            <button
              onClick={this.handleReset}
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 rounded-xl shadow-lg shadow-rose-500/20 transition-all cursor-pointer"
            >
              Reset Component State
            </button>
            <button
              onClick={() => {
                toggleApiErrorSimulation(false);
                window.location.reload();
              }}
              className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            >
              Reload Browser
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
