import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, Building2, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSignUpSuccess(true);
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }, 1500);
  };

  if (signUpSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 inline-block rounded-full bg-accent/10 p-3">
            <CheckCircle2 className="h-12 w-12 text-accent" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Account Created!
          </h2>
          <p className="mb-6 text-muted-foreground">
            Your AccFlow account has been created successfully. You'll be
            redirected to the dashboard shortly.
          </p>
          <div className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm text-muted-foreground">Redirecting...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-primary to-accent p-3">
            <span className="text-lg font-bold text-white">AF</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">AccFlow</h1>
          <p className="mt-2 text-muted-foreground">
            Modern Accounting Platform
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Create Account
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of businesses using AccFlow
          </p>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Company Name Input */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Company Name
              </label>
              <div className="relative mt-2">
                <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your Company Inc"
                  required
                  className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-10 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-10 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary/20"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-primary hover:underline transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-6 grid gap-3 text-center text-sm">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <span>30-day free trial, no credit card required</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <span>All features included</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
