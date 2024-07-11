"use client";
import BForm from "@/Form/BForm/BForm";
import BInput from "@/Form/BInput/BInput";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
// zod validation schema
const validationSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Must be at least 6 characters"),
});

// start login page

const LoginPage = () => {
    const [error, setError] = useState("");

const isLoading= false;

    // handle login button
    const router = useRouter();

    const handleLogin = async (values: FieldValues) => {
      console.log(values)
    //   todo: handle login
};

return (
    <Container>
        <Stack
            sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    maxWidth: 600,
                    width: "100%",
                    boxShadow: 1,
                    borderRadius: 1,
                    p: 4,
                    textAlign: "center",
                }}
            >
                <Stack
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography variant="h6" fontWeight={700}>
                      BELAL.H
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={600}>
                            Login BELAL.H
                        </Typography>
                    </Box>
                </Stack>

                {error && (
                    <Box>
                        <Typography
                            sx={{
                                backgroundColor: "red",
                                padding: "1px",
                                borderRadius: "2px",
                                color: "white",
                                marginTop: "5px",
                            }}
                        >
                            {error}
                        </Typography>
                    </Box>
                )}

                <Box>
                    <BForm
                        onSubmit={handleLogin}
                        resolver={zodResolver(validationSchema)}
                        defaultValues={{
                            email: "",
                            password: "",
                        }}
                    >
                        <Grid container spacing={2} my={1}>
                            <Grid item md={6}>
                                <BInput
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <BInput
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>

                        <Link href={"/forgot-password"}>
                            <Typography
                                mb={1}
                                textAlign="end"
                                component="p"
                                fontWeight={300}
                                sx={{
                                    textDecoration: "underline",
                                }}
                            >
                                Forgot Password?
                            </Typography>
                        </Link>

                        <Button
                        variant="contained"
                            sx={{
                                margin: "10px 0px",
                            }}
                            fullWidth={true}
                            type="submit"
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </Button>
                        <Typography component="p" fontWeight={300}>
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="hover:text-blue-500 hover:underline"
                            >
                                Create an account
                            </Link>
                        </Typography>
                        <Typography
                            component="p"
                            fontWeight={300}

                        >
                            Back to{" "}
                            <Link href="/" className="hover:text-blue-500 hover:underline">
                                Home
                            </Link>
                        </Typography>
                    </BForm>
                </Box>
            </Box>
        </Stack>
    </Container>
);
};

export default LoginPage;
