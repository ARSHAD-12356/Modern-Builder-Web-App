'use client'

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { X, Send, ArrowRight, RotateCcw } from 'lucide-react'
import { getAiResponse } from '@/lib/ai-assistant'

const AI_BOT_IMG = '/assets/ai-bot.jpg'

const SUGGESTION_CHIPS = [
  'Project Details',
  'Amenities',
  'Floor Plans',
  'Location',
  'Pricing',
  'Site Visit',
]

const WELCOME_MESSAGES = [
  {
    id: 'w1',
    role: 'bot' as const,
    text: "Hello! 👋 I'm your BD AI Assistant.\n\nAsk me anything about the project, apartments, amenities, location, plans or facilities.",
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

/**
 * Parses lightweight Markdown (bold, italic, links, bullets) for readable chat bubbles.
 */
function FormattedMessage({ text }: { text: string }) {
  const lines = text.split('\n')

  const formatBoldItalic = (textChunk: string, keyPrefix: string) => {
    const parts = textChunk.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`${keyPrefix}-b-${i}`}>{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={`${keyPrefix}-i-${i}`}>{part.slice(1, -1)}</em>
      }
      return part
    })
  }

  const parseInline = (str: string) => {
    const tokens: React.ReactNode[] = []
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let lastIdx = 0
    let match: RegExpExecArray | null

    while ((match = linkRegex.exec(str)) !== null) {
      if (match.index > lastIdx) {
        tokens.push(formatBoldItalic(str.substring(lastIdx, match.index), `t-${match.index}`))
      }
      const label = match[1]
      const url = match[2]
      const isExternal = url.startsWith('http') || url.startsWith('tel:') || url.startsWith('mailto:')
      tokens.push(
        <a
          key={`l-${match.index}`}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="ai-chat-link"
        >
          {label}
        </a>
      )
      lastIdx = linkRegex.lastIndex
    }

    if (lastIdx < str.length) {
      tokens.push(formatBoldItalic(str.substring(lastIdx), `t-end`))
    }

    return tokens.length > 0 ? tokens : formatBoldItalic(str, 'plain')
  }

  return (
    <div className="ai-chat-formatted">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="ai-chat-spacer" />
        }
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="ai-chat-bullet">
              <span className="ai-chat-bullet-dot" aria-hidden="true">•</span>
              <span className="ai-chat-bullet-content">{parseInline(trimmed.substring(2))}</span>
            </div>
          )
        }
        return (
          <p key={idx} className="ai-chat-paragraph">
            {parseInline(line)}
          </p>
        )
      })}
    </div>
  )
}

export function AiChatbot({ onSendMessage }: AiChatbotProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(WELCOME_MESSAGES)
  const [thinking, setThinking] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleNewChat = () => {
    setMessages(WELCOME_MESSAGES)
    setInput('')
    setThinking(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || thinking) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)

    try {
      if (onSendMessage) {
        const reply = await onSendMessage(trimmed)
        setMessages(prev => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: reply }])
      } else {
        // Run against centralized Knowledge Base assistant with small natural delay
        const [reply] = await Promise.all([
          getAiResponse(trimmed),
          new Promise(res => setTimeout(res, 360)),
        ])
        setMessages(prev => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: reply }])
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: 'bot',
          text: 'Sorry, I couldn’t process that right now. Please try again or contact our project team.',
        },
      ])
    } finally {
      setThinking(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      <button
        type="button"
        className={`ai-chat-trigger${open ? ' ai-chat-trigger--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Open BD AI Assistant"
        aria-expanded={open}
      >
        <img src={AI_BOT_IMG} alt="BD AI Assistant" className="ai-chat-trigger-img" />
        <span className="ai-chat-trigger-tooltip">Ask BD AI Assistant</span>
        <span className="ai-chat-trigger-pulse" aria-hidden="true" />
      </button>

      <div
        className={`ai-chat-panel${open ? ' ai-chat-panel--open' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="BD AI Assistant"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-chat-header-avatar">
            <img src={AI_BOT_IMG} alt="BD AI Assistant" />
          </div>
          <div className="ai-chat-header-info">
            <strong>BD AI Assistant</strong>
            <span>
              <span className="ai-chat-status-dot" aria-hidden="true" />
              Online &bull; Ready to help
            </span>
          </div>
          <div className="ai-chat-header-actions">
            <button
              type="button"
              className="ai-chat-header-btn ai-chat-refresh"
              onClick={handleNewChat}
              aria-label="New Chat"
              title="New Chat"
            >
              <RotateCcw size={15} />
              <span className="ai-chat-btn-tooltip">New Chat</span>
            </button>
            <button
              type="button"
              className="ai-chat-header-btn ai-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close BD AI Assistant"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Conversation Body */}
        <div className="ai-chat-body" ref={bodyRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`ai-chat-msg ai-chat-msg--${msg.role}`}>
              {msg.role === 'bot' && (
                <img src={AI_BOT_IMG} alt="BD AI Assistant" className="ai-chat-avatar" />
              )}
              <div className="ai-chat-bubble">
                <FormattedMessage text={msg.text} />
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {thinking && (
            <div className="ai-chat-msg ai-chat-msg--bot">
              <img src={AI_BOT_IMG} alt="BD AI Assistant" className="ai-chat-avatar" />
              <div className="ai-chat-bubble ai-chat-bubble--thinking">
                <div className="ai-chat-thinking-label">
                  <span>BD AI Assistant is thinking...</span>
                  <div className="ai-chat-thinking-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suggestion Chips */}
          {messages.length <= 1 && !thinking && (
            <div className="ai-chat-chips">
              <span className="ai-chat-chips-label">Suggested Questions:</span>
              <div className="ai-chat-chips-grid">
                {SUGGESTION_CHIPS.map(chip => (
                  <button
                    key={chip}
                    type="button"
                    className="ai-chat-chip"
                    onClick={() => sendMessage(chip)}
                  >
                    <span>{chip}</span>
                    <ArrowRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Input Area */}
        <div className="ai-chat-footer">
          <div className="ai-chat-input-row">
            <input
              ref={inputRef}
              type="text"
              className="ai-chat-input"
              placeholder="Ask about BD projects, apartments, amenities..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Ask BD AI Assistant"
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
          <p className="ai-chat-disclaimer">
            AI responses are informational. Contact our team for accurate details.
          </p>
        </div>
      </div>
    </>
  )
}
