"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import Link from "next/link";
import { FieldValues } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import BForm from "@/Form/BForm/BForm";
import BInput from "@/Form/BInput/BInput";
import { useRegisterMutation } from "@/redux/api/authApi";

const validationSchema = z.object({
  username: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const defaultValues = {
  username: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation()

  // handle register
  const handleRegister = async (values: FieldValues) => {
    const res=await register(values).unwrap();
    if(res.success) {
      alert("Registered successfully")
      router.push("/login")
    }
    console.log(res);
    // todo register
    // call the server to register the user
    // then navigate to the dashboard page
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
              <Typography variant="h6" fontWeight={600}>
                Cozy Pets
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Please Register here
              </Typography>
            </Box>
          </Stack>

          <Box>
            <BForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <BInput label="Name" fullWidth={true} name="username" />
                </Grid>
                <Grid item md={6}>
                  <BInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid item md={6}>
                  <BInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                {isLoading ? "Registering" : "Register"}
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link
                  href="/login"
                  className="hover:text-blue-500 hover:underline"
                >
                  Login here
                </Link>
              </Typography>
            </BForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
