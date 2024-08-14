'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  CircularProgress,
  Box,
  IconButton
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';

const FloatingSearchButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ text: string; time: string; sender: 'user' | 'bot' }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref para rolar até o fim

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const timestamp = dayjs().format('HH:mm');
      setChatHistory([...chatHistory, { text: message, time: timestamp, sender: 'user' }]);
      setMessage('');
      setLoading(true);

      try {
        const response = await fetch('/api/chatgpt', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: message })
        });

        if (response.ok) {
          const data = await response.json();
          setChatHistory([...chatHistory, { text: message, time: timestamp, sender: 'user' }, { text: data.reply, time: dayjs().format('HH:mm'), sender: 'bot' }]);
        } else {
          setChatHistory([...chatHistory, { text: message, time: timestamp, sender: 'user' }, { text: 'Ocorreu um erro.', time: dayjs().format('HH:mm'), sender: 'bot' }]);
        }
      } catch (error) {
        setChatHistory([...chatHistory, { text: message, time: timestamp, sender: 'user' }, { text: 'Ocorreu um erro.', time: dayjs().format('HH:mm'), sender: 'bot' }]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Função para rolar para o fim da lista de mensagens
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          borderRadius: '50%',
          minWidth: 0,
          width: 56,
          height: 56,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
        }}
        onClick={handleClickOpen}
      >
        <ChatIcon sx={{ color: 'white' }} />
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent
          sx={{
            bgcolor: 'white',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '300px',
            borderRadius: 2,
            border: '1px solid #004d00',
          }}
        >
          <Box sx={{ position: 'relative', padding: 2, borderBottom: '1px solid #004d00' }}>
            <Typography variant="h6">
              Olá, sou a Consig, em que posso ajudar?
            </Typography>
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
            {chatHistory.map((msg, index) => (
              <Box key={index} sx={{ marginBottom: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: msg.sender === 'user' ? 'rgb(44, 95, 37)' : 'rgb(220, 220, 220)',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    padding: 1,
                    borderRadius: 1,
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                  }}
                >
                  {msg.text}
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', display: 'block' }}>
                    {msg.time}
                  </span>
                </Typography>
              </Box>
            ))}
            {loading && <CircularProgress size={24} sx={{ display: 'block', margin: 'auto' }} />}
            <div ref={messagesEndRef} /> {/* Elemento para rolar até o fim */}
          </Box>
          <TextField
            autoFocus
            margin="dense"
            label="Digite sua mensagem"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
                e.preventDefault();
              }
            }}
            sx={{
              mb: 2,
              backgroundColor: 'lightgray',
              '& .MuiInputBase-root': {
                color: 'black',
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: 'rgb(44, 95, 37)',
            color: 'white',
            borderTop: '1px solid #004d00',
          }}
        >
          <Button
            onClick={handleClose}
            color="primary"
            startIcon={<CloseIcon sx={{ color: 'white' }} />}
            sx={{ color: 'white' }}
          >
            Fechar
          </Button>
          <Button
            onClick={handleSendMessage}
            color="primary"
            disabled={loading}
            startIcon={<SendIcon sx={{ color: 'white' }} />}
            sx={{ color: 'white' }}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FloatingSearchButton;
