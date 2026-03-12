# 🚀 Vercel Deployment Guide for NovaSMSHubs

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository with your code
- Backend API deployed (separate from Vercel)

## Step 1: Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository containing NovaSMSHubs

## Step 2: Configure Project Settings

### Root Directory
- **Root Directory**: Leave empty (or set to `frontend` if deploying only frontend)

### Build Settings
- **Framework Preset**: Create React App
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/build`
- **Install Command**: `cd frontend && npm install`

### Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

```
REACT_APP_API_URL=https://your-api-domain.com/api
```

**Important**: Replace `https://your-api-domain.com/api` with your actual backend API URL.

## Step 3: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

## Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Common Issues & Fixes

### Issue: "404 Not Found" on Routes
**Fix**: The `vercel.json` file includes rewrites to handle React Router. Make sure it's in your repository root.

### Issue: API Calls Failing
**Fix**: 
1. Set `REACT_APP_API_URL` environment variable in Vercel
2. Make sure your backend API has CORS enabled for your Vercel domain
3. Update the API URLs in the code if needed

### Issue: Build Fails
**Fix**:
1. Check Node.js version (should be 16+)
2. Ensure all dependencies are in `package.json`
3. Check build logs in Vercel dashboard

### Issue: Environment Variables Not Working
**Fix**:
1. Make sure variable names start with `REACT_APP_`
2. Redeploy after adding environment variables
3. Check that variables are set for "Production" environment

## Environment Variables Required

```
REACT_APP_API_URL=https://your-backend-api.com/api
```

## File Structure for Vercel

```
NovaSMSHubs/
├── vercel.json          # Vercel configuration (root)
├── frontend/
│   ├── package.json
│   ├── vercel.json      # Frontend-specific config
│   ├── src/
│   └── public/
└── ...
```

## Notes

- The backend API should be deployed separately (not on Vercel)
- Vercel is for static frontend hosting
- Backend should be on a service like Railway, Render, or your own server
- Make sure CORS is configured on your backend to allow requests from your Vercel domain

## Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables are set
3. Ensure `vercel.json` is in the correct location
4. Check browser console for runtime errors
