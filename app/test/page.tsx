
"use client"

import React, { useState } from 'react';
import WEbarebares from '@/generated-forms/WEbarebares';
import Testform1 from '@/generated-forms/Testform1_1751007426079';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, ArrowLeft, Github, Twitter, Mail, User, MessageSquare, UserPlus, LogIn, Star, BarChart3, CreditCard, Phone } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Generated Form</h1>
      <WEbarebares />
    </div>
  );
}

