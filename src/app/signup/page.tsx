'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, User, Phone, AlertCircle, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1500));

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.name);

      setSuccess(true);

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.1] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <ShieldCheck className="h-7 w-7 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-none mb-1">EDBELL</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Edusolutions LLP</p>
            </div>
          </Link>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
            Partner Registration
          </h2>
          <p className="text-slate-400 font-light">
            Join India's fastest growing educational ecosystem
          </p>
        </div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] py-8 px-6 shadow-2xl sm:rounded-3xl sm:px-10">
          {success ? (
            <div className="text-center py-12 space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-3xl animate-bounce">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-100">Welcome on Board!</h3>
                <p className="text-slate-400 font-light">
                  Your partner account has been created successfully. Redirecting you to the portal...
                </p>
              </div>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500/20 border-t-blue-500"></div>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 animate-shake">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div className="ml-3">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-all duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-12 pr-4 py-3 bg-[#030712]/50 border border-white/[0.05] rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-all duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-12 pr-4 py-3 bg-[#030712]/50 border border-white/[0.05] rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 ml-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-all duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-12 pr-4 py-3 bg-[#030712]/50 border border-white/[0.05] rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300 ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-all duration-300"></div>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 bg-[#030712]/50 border border-white/[0.05] rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                        placeholder="••••••••"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-500">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 ml-1">
                    Confirm
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-all duration-300"></div>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 bg-[#030712]/50 border border-white/[0.05] rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                        placeholder="••••••••"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-slate-500">
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center ml-1">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 bg-[#030712] border-white/[0.1] text-blue-600 focus:ring-blue-500/50 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-xs text-slate-400">
                  I agree to the <Link href="/terms" className="text-blue-500 hover:text-blue-400">Terms & Conditions</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Create Account</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>

              <div className="pt-4 border-t border-white/[0.05] text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{' '}
                  <Link href="/login" className="font-bold text-blue-500 hover:text-blue-400 transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-blue-400 font-medium transition-colors flex items-center justify-center group">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
