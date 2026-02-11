#!/bin/bash

# Download all Gemini meeting notes since January 1st, 2026
# Critical meetings for Mindvalley company analysis

echo "🚀 Starting comprehensive meeting notes download..."

# Create organized folders
mkdir -p /Users/vishen/clawd/company-analysis/meeting-notes/{strategy,executive,product,revenue,innovation,campaigns}

# Strategy & Executive Meetings (CRITICAL)
echo "📋 Downloading Strategy & Executive meetings..."

# Already downloaded:
# 19be54b915852696 - Strategy Days Jan 22, 2026 ✅
# 19be0327a55285cd - Strategy Days Jan 21, 2026 ✅ 
# 19b97b05f30d6ea2 - Exec Meeting Jan 7, 2026 ✅

# Product & Innovation Meetings
echo "🔬 Downloading Innovation & Product meetings..."
gog gmail get 19bfa098fd465ae5 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/innovation/innovation-jan26-2026.txt
gog gmail get 19bd59821614bcbd --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/innovation/innovation-jan19-2026.txt
gog gmail get 19b8d9798ff1ce0b --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/innovation/innovation-jan5-2026.txt
gog gmail get 19b92cff7d3fc980 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/product/product-focus-jan6-2026.txt
gog gmail get 19bff0a5ab0defaf --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/product/product-intelligence-jan27-2026.txt

# Revenue Meetings  
echo "💰 Downloading Revenue meetings..."
gog gmail get 19bfeab43249f075 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/revenue/revenue-jan27-2026.txt
gog gmail get 19bda738350b483c --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/revenue/revenue-jan20-2026.txt
gog gmail get 19bb650347d1f205 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/revenue/revenue-jan13-2026.txt
gog gmail get 19b925b688d383eb --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/revenue/revenue-jan6-2026.txt

# Marketing & Campaign Strategy
echo "📈 Downloading Marketing & Campaign meetings..."
gog gmail get 19c2dc9c3e75a5f5 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/campaigns/campaigns-feb5-2026.txt
gog gmail get 19be60ec3dd92301 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/campaigns/campaigns-jan22-2026.txt
gog gmail get 19b9d6f4fcbf1328 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/campaigns/campaigns-jan8-2026.txt
gog gmail get 19c08ec3acaaba0a --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/campaigns/funnel-marketing-jan29-2026.txt
gog gmail get 19be501523b8e64c --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/campaigns/funnel-marketing-jan22-2026.txt

# Recent Critical Updates (February)
echo "🆕 Downloading February updates..."  
gog gmail get 19c32a6a4ed96c46 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/finerminds-sync-feb6-2026.txt
gog gmail get 19c326d87c98ae9f --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/martech-sync-feb6-2026.txt
gog gmail get 19c32d863e27cd77 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/vibrantly-sync-feb6-2026.txt
gog gmail get 19c236f03dea49da --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/vibrantly-sync-feb3-2026.txt

# OKR System Updates
gog gmail get 19c28571b7f0bfa8 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/okr-update-feb4-2026.txt
gog gmail get 19bdf772ce66f538 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/product-metrics-jan21-2026.txt

# Premium Programs Strategy
gog gmail get 19c28c06d20e9da6 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/premium-programs-feb4-2026.txt
gog gmail get 19be0a544fa143aa --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/premium-programs-jan21-2026.txt
gog gmail get 19bbca0961e632f1 --format=full > /Users/vishen/clawd/company-analysis/meeting-notes/premium-programs-jan14-2026.txt

echo "✅ All meeting notes downloaded!"
echo "📊 Ready for comprehensive company analysis..."