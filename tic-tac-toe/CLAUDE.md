# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 tic-tac-toe game project using React 19 and the App Router. The project is set up as a standard Next.js application with Turbopack enabled for faster development builds.

## Development Commands

### Primary Development
- `npm run dev` - Start development server with Turbopack (opens at http://localhost:3000)
- `npm run build` - Build production version with Turbopack
- `npm start` - Start production server (requires build first)
- `npm run lint` - Run ESLint for code quality checks

### Code Quality
The project uses ESLint with Next.js core web vitals configuration. ESLint ignores common build directories (node_modules, .next, out, build).

## Project Structure

### App Router Architecture
- `src/app/` - Next.js App Router directory
  - `layout.js` - Root layout with Geist font configuration
  - `page.js` - Main page component (currently default Next.js landing page)
  - `globals.css` - Global styles
  - `page.module.css` - Page-specific CSS modules

### Key Technologies
- **Next.js 15** with App Router
- **React 19**
- **CSS Modules** for styling
- **Geist fonts** (Sans and Mono variants)

## Important Notes

### Turbopack Compatibility Issue
⚠️ **Warning**: Turbopack has been disabled due to a Unicode handling bug with Chinese characters in file paths. The project path contains Chinese characters ("前端训练营") which causes Turbopack to crash with character boundary errors.

**Current Configuration**: Uses standard Next.js webpack instead of Turbopack for better compatibility.

## Development Notes

### Font Configuration
The project uses Geist fonts loaded via `next/font/google` with CSS variables (`--font-geist-sans`, `--font-geist-mono`) configured in the root layout.

### Current State
The project contains a fully functional tic-tac-toe game with the following features:
- Interactive 3x3 game board with click handling
- Turn-based gameplay (X and O alternating)
- Winner detection with 8 winning combinations
- Game history and time travel functionality
- Clean, responsive UI with CSS modules