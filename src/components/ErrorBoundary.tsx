import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 border border-red-100 shadow-sm">
                        <AlertTriangle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Xatolik yuz berdi</h1>
                    <p className="text-slate-500 max-w-sm mb-4 leading-relaxed font-medium">
                        Ilovani yuklashda xatolik yuz berdi yoki ma'lumotlar topilmadi. Iltimos, sahifani yangilang.
                    </p>

                    {this.state.error && (
                        <div className="bg-white p-4 rounded-xl border border-red-200 text-left w-full max-w-md overflow-auto mb-8 shadow-sm">
                            <p className="text-red-600 font-bold mb-2 text-sm">Xatolik xabari:</p>
                            <p className="text-slate-800 text-xs font-mono bg-slate-50 p-2 rounded mb-4 wrap-break-word">
                                {this.state.error.message}
                            </p>
                            <p className="text-red-600 font-bold mb-2 text-sm">Stack Trace:</p>
                            <textarea
                                className="w-full text-slate-800 text-[10px] font-mono bg-slate-50 p-2 rounded h-32 border border-slate-200 outline-none resize-none focus:ring-0"
                                readOnly
                                value={this.state.error.stack || ''}
                            />
                        </div>
                    )}

                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold px-8 py-3.5 rounded-full shadow-sm transition-all active:scale-95 flex items-center gap-2.5"
                    >
                        <RefreshCcw className="w-4.5 h-4.5" strokeWidth={2} />
                        Sahifani yangilash
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
