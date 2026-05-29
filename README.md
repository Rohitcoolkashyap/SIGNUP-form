# Root Credit - Registration UI

This is my frontend assignment. I built the signup flow from the Figma file using React and TypeScript.

# DEMO URL: https://signupformroot.netlify.app/

## How to run

```
npm install
npm start
```

Build for deploy:

```
npm run build
```

Upload the build folder to Vercel or Netlify.

## Steps in the flow

1. Pick account type (personal or business)
2. Enter mobile number (+91 only)
3. Enter OTP
4. Enter name
5. Create password
6. Success popup with summary

## Stack

- React + TypeScript (create react app setup with react-scripts)
- CSS only
- Code splitting with React.lazy on steps

## Folder structure

- src/components - buttons, inputs, layout, modal
- src/pages - main registration page and each step
- src/registration - form state and validation
- public/assets - illustration image

## Extra stuff I added

- hover and focus on buttons and inputs
- form validation and error messages
- loading on continue button
- OTP boxes with auto focus and resend timer
- show/hide password

OTP is fake on frontend only, no real API connected.
