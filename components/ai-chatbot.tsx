'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { X, Send, ArrowRight } from 'lucide-react'

const AI_BOT_IMG = '/assets/ai-bot.jpg'

const SUGGESTION_CHIPS = [
  'Project Details',
  'Amenities',
  'Floor Plans',
  'Location',
  'Pricing',
]

const WELCOME_MESSAGES = [
  {
    id: 'w1',
    role: 'bot' as const,
    text: "Hello! 👋 I'm your B.S. HITECH AI Assistant.\n\nAsk me anything about the project, apartments, amenities, location, plans or facilities.",
  },
]

interface Message {
  id: string
  role: 'bot' | 'user'
  text: string
}

interface AiChatbotProps {
  onSendMessage?: (msg: string) => Promise<string>
}

export function AiChatbot({ onSendMessage }: AiChatbotProps) {
  const [open, setOpen]           = useState(false)
  const [input, setInput]         = useState('')
  const [messages, setMessages]   = useState<Message[]>(WELCOME_MESSAGES)
  const [thinking, setThinking]   = useState(false)
  const bodyRef                   = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, thinking])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 280)
    }
  }, [open])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)
    if (onSendMessage) {
      try {
        const reply = await onSendMessage(trimmed)
        setMessages(prev => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: reply }])
      } catch {
        setMessages(prev => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: 'Our team will get back to you shortly. Please also reach us on WhatsApp for instant support.' }])
      } finally {
        setThinking(false)
      }
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: '🏡 Thank you for your interest in B.S. HITECH APARTMENT! Our team will reach out to you very soon. For immediate assistance, feel free to WhatsApp us at +91 920464875.' }])
        setThinking(false)
      }, 900)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  return (
    <>
      <button
        type="button"
        className={`ai-chat-trigger${open ? ' ai-chat-trigger--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Open AI Assistant"
        aria-expanded={open}
      >
        <img src={AI_BOT_IMG} alt="AI Assistant" className="ai-chat-trigger-img" />
        <span className="ai-chat-trigger-tooltip">Ask AI Assistant</span>
        <span className="ai-chat-trigger-pulse" aria-hidden="true" />
      </button>

      <div
        className={`ai-chat-panel${open ? ' ai-chat-panel--open' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="B.S. HITECH AI Assistant"
        aria-hidden={!open}
      >
        <div className="ai-chat-header">
          <div className="ai-chat-header-avatar">
            <img src={AI_BOT_IMG} alt="AI" />
          </div>
          <div className="ai-chat-header-info">
            <strong>B.S. HITECH AI Assistant</strong>
            <span><span className="ai-chat-status-dot" aria-hidden="true" />Online &bull; Ready to help</span>
          </div>
          <button type="button" className="ai-chat-close" onClick={() => setOpen(false)} aria-label="Close AI Assistant">
            <X size={16} />
          </button>
        </div>

        <div className="ai-chat-body" ref={bodyRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`ai-chat-msg ai-chat-msg--${msg.role}`}>
              {msg.role === 'bot' && (
                <img src={AI_BOT_IMG} alt="AI" className="ai-chat-avatar" />
              )}
              <div className="ai-chat-bubble">
                {msg.text.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="ai-chat-msg ai-chat-msg--bot">
              <img src={AI_BOT_IMG} alt="AI" className="ai-chat-avatar" />
              <div className="ai-chat-bubble ai-chat-bubble--thinking">
                <span /><span /><span />
              </div>
            </div>
          )}
          {messages.length <= 1 && !thinking && (
            <div className="ai-chat-chips">
              {SUGGESTION_CHIPS.map(chip => (
                <button key={chip} type="button" className="ai-chat-chip" onClick={() => sendMessage(chip)}>
                  {chip} <ArrowRight size={11} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ai-chat-footer">
          <div className="ai-chat-input-row">
            <input
              ref={inputRef}
              type="text"
              className="ai-chat-input"
              placeholder="Ask about B.S. HITECH Apartment..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Type your message"
              disabled={thinking}
            />
            <button
              type="button"
              className="ai-chat-send"
              onClick={() => sendMessage(input)}
              aria-label="Send message"
              disabled={!input.trim() || thinking}
            >
              <Send size={16} />
            </button>
          </div>
          <p className="ai-chat-disclaimer">AI responses are informational. Contact our team for accurate details.</p>
        </div>
      </div>
    </>
  )
}
