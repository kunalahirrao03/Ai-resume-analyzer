import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Lightbulb, BarChart3, Mail, Zap, Target,
  Download, Star, Phone, Link2, Code2, Globe,
  GraduationCap, Briefcase, TrendingUp, AlertTriangle,
  CheckCircle2, Award, ArrowUpRight
} from 'lucide-react';
import './Dashboard.css';

const AnimatedScore = ({ value, duration = 1500 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{display}</>;
};

const Dashboard = ({ data }) => {
  const { profile, skills, score, tier, breakdown, stats, recommendations, missingTrending, parsedData } = data;
  const [jdText, setJdText] = useState("");
  const [matchPercent, setMatchPercent] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); }