"use client";

import { signInAPI } from "@/apis/auth";
import useInput from "@/hooks/useInput";
import {
  Box,
  Button,
  CircularProgress,
  colors,
  Grid,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

function SignInForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const { mutate, isLoading } = useMutation(signInAPI, {
    onError: (error: any) => {
      alert(error.response?.data);
    },
    onSuccess: async () => {
      queryClient.refetchQueries(["user"]);
    },
  });

  const handleForm = useCallback(() => {
    mutate({ email, password });
  }, [email, mutate, password]);

  return (
    <Box
      component="form"
      sx={{
        mt: 3,
        padding: "2rem",
        borderRadius: "1rem",
        backgroundColor: colors.grey[50],
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="이메일"
            value={email}
            onChange={handleEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            type="password"
            label="비밀번호"
            value={password}
            onChange={handlePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleForm}>
            로그인{isLoading && <CircularProgress size={12} />}
          </Button>
          <Button variant="outlined" onClick={() => router.push("/signup")}>
            회원가입
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignInForm;
