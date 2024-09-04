// React Imports
import { FC, Fragment, useState } from "react";
import { useRouter } from "next/router";
// React Query Imports
import { UserLoginMutationHook } from "@/services/react-query-client/auth/user-login";
import { setCookieClientSideFn } from "@/utils/storage.util";
import { loginSuccess, updateUser } from "@/redux/slices/authentication.slice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/redux/store";

// Custom Component Imports

interface ISignInViewProps {}

const SignInView: FC<ISignInViewProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync } = UserLoginMutationHook();

  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  const login = async (username: string, pass: string) => {
    setLoader(true);
    setError(null); // Reset the error state
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: pass,
          expiresInMins: 30,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await res.json();
      setCookieClientSideFn("accessToken", data.token);
      dispatch(loginSuccess({ user: data, token: data.token }));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid username or password. Please try again."); // Set the error message
    } finally {
      setLoader(false); // Ensure loader is always reset
    }
  };

  return (
    <Fragment>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don&#x27;t have an account?{" "}
                <a
                  href="#"
                  title=""
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Create a free account
                </a>
              </p>
              <form onSubmit={handleSubmit} method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Username{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUsername(e.target.value)
                        }
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                      <a
                        href="#"
                        title=""
                        className="text-sm font-semibold text-black hover:underline"
                      >
                        {" "}
                        Forgot password?{" "}
                      </a>
                    </div>
                    <div className="mt-2">
                      <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPassword(e.target.value)
                        }
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="mt-4 text-red-600">{error}</div> // Error message display
                  )}
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    type="submit"
                    disabled={loader}
                  >
                    Get started{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </form>
              <div className="mt-3 space-y-3"></div>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SignInView;
