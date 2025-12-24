'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';

export default function RedirectToOnboarding() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { role, setRole } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      if (isLoaded && isSignedIn && user) {
        // Fetch user role from your database via API
        try {
          const response = await fetch('/api/user/role');
          if (response.ok) {
            const { role: userRole } = await response.json();
            setRole(userRole);
            
            // If user role is PENDING, redirect to onboarding
            if (userRole === 'PENDING') {
              router.push('/onboarding');
            }
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    checkUserRole();
  }, [isLoaded, isSignedIn, user, setRole, router]);

  return null; // This component doesn't render anything
}