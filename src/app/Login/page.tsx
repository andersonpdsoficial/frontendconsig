'use client'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormEvent, Suspense, useRef, useState } from 'react';
import {
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Link,
} from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import * as random from 'maath/random';
import { signIn } from 'next-auth/react';
import { Group } from 'three';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Points, PointMaterial } from '@react-three/drei';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'next-auth';


const loginSchema = z.object({
    cpf: z
      .string({ required_error: 'CPF é obrigatório' })
      .min(1, 'CPF é obrigatório'),
    password: z
      .string({ required_error: 'Senha é obrigatória' })
      .min(1, 'Senha é obrigatória'),
  });

export default function Login() {
  const [Error, setError] = useState<string | null | boolean>(null);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), 
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: User | any) => {
    setLoading(true);
    setCpfError(null);
    setPasswordError(null);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: data.cpf,
        password: data.password,
      });

      console.log('resposta do result',result);

      setLoading(false);

      if (result?.error) {
        setError(true);
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setLoading(false);
    }
  };
  console.log('erros do zod', errors);
  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'rgba(0, 0, 0, 1)',
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <ambientLight />
        <Stars />
      </Canvas>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(18, 48, 12, 0.315)',
            zIndex: 1,
          }}
        />
        <Suspense fallback={null}>
          <Container
            component={Paper}
            maxWidth="xs"
            sx={{
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              padding: 4,
              borderRadius: 2,
              backdropFilter: 'blur(10px)',
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <Avatar
                sx={{
                  mb: 3,
                  bgcolor: 'rgb(2, 89, 55)', 
                  width: 300,
                  height: 300,
                }}
                src="/dpe-logo.png"
              />
              <Typography component="h1" variant="h4">
              Sistema de Consignado
              </Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                {...register('cpf')}
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoComplete="cpf"
                autoFocus
                error={!!errors.cpf}
                helperText={errors.cpf?.message?.toString()}

              />
              <TextField
                {...register('password')}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                 error={!!errors.password}
                helperText={errors.password?.message?.toString()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Logar
              </LoadingButton>
              <Grid container>
                {cpfError || passwordError || Error  && <div style={{ color: 'red' }}>{"Usuário e/ou Senha Inválido(s)"}</div>}
                <Grid item xs />
                <Grid item>
                  <Link href="/apidjango/reset_password" variant="body2">
                    {'Esqueceu a senha?'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Suspense>
      </div>
    </>
  );
}

function Stars(props: any) {
  const ref = useRef<Group>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 }),
  );
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
