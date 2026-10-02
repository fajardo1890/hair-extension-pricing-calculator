/**
 * Atelier — Luxury Hair Extension & Color Consultation App
 * Mobile-First, Uncluttered Reactive Consultation Suite with Full Functional Parity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Consultation State
  const state = {
    mode: 'both', // 'both' | 'extensions' | 'color'
    viewMode: 'stylist', // 'stylist' | 'client'
    clientName: '',
    clientContact: '',
    currentStep: 1,

    // Multi-Method Extension Entries
    nextEntryId: 2,
    extensionEntries: [
      {
        id: 1,
        methodId: 'weft',
        serviceType: 'newInstall', // 'newInstall' | 'maintenance'
        units: 2,
        hairSourcing: 'salon', // 'salon' | 'client'
        brandId: 'bellami',
        typeId: 'bellami-hand-tied',
        length: '22 inch',
        packs: 2
      }
    ],

    // Stylist Craft Tiers
    stylistLevel: 5,        // Extensionist seniority tier (1-10)
    colorStylistLevel: 5,   // Independent colorist seniority tier (1-10)

    // Color Formulation & Hair Profile
    colorApplication: 'root-to-tip', // 'root-to-tip' | 'touch-up'
    hairLengthProfile: 'long',
    hairDensityDifficulty: 5, // 1 to 10
    extraBowls: 0,
    primaryColorServiceId: '', // Default None

    // Standalone Salon Services
    selectedKeratinId: '',
    selectedHaircutId: '',
    selectedBlowoutId: '',

    // Add-Ons & Treatments
    selectedAddons: new Set(['root-smudge', 'custom-tone']),
    selectedTreatments: new Set(['k18']), // Maximum 3 allowed!

    // Retail Aftercare
    selectedAftercare: new Set(['kit-complete'])
  };

  // DOM Elements - Shell & Modes
  const modeTabs = document.querySelectorAll('.mode-tab');
  const viewBtns = document.querySelectorAll('.view-btn');
  const resetBtn = document.getElementById('btn-reset');
  const toastEl = document.getElementById('atelier-toast');

  // Sections
  const extensionsSection = document.getElementById('section-extensions');
  const stylistSection = document.getElementById('section-stylist');
  const colorSection = document.getElementById('section-color');
  const aftercareSection = document.getElementById('section-aftercare');

  // Extension Entries Container & Add Button
  const extensionEntriesContainer = document.getElementById('extension-entries-container');
  const btnAddMethod = document.getElementById('btn-add-method');

  // Extensionist Stylist Tier
  const tierSlider = document.getElementById('tier-slider');
  const tierTitleEl = document.getElementById('tier-title');
  const tierExpEl = document.getElementById('tier-exp');

  // Colorist Stylist Tier
  const colorTierSlider = document.getElementById('color-tier-slider');
  const colorTierTitleEl = document.getElementById('color-tier-title');
  const colorTierExpEl = document.getElementById('color-tier-exp');
  const COLORIST_TITLES = {
    1: 'Level 1: Emerging Colorist',
    2: 'Level 2: Junior Colorist',
    3: 'Level 3: Studio Colorist',
    4: 'Level 4: Senior Colorist',
    5: 'Level 5: Lead Colorist',
    6: 'Level 6: Master Colorist',
    7: 'Level 7: Senior Master Colorist',
    8: 'Level 8: Director Colorist',
    9: 'Level 9: Executive Color Artist',
    10: 'Level 10: Creative Color Director'
  };

  // Color Application & Profile
  const applicationToggleGroup = document.getElementById('application-toggle-group');
  const clientLengthSelect = document.getElementById('client-length-select');
  const clientDensitySelect = document.getElementById('client-density-select');
  const bowlCalcDesc = document.getElementById('bowl-calc-desc');
  const colorServiceSelect = document.getElementById('color-service-select');

  // Standalone Services Selects
  const keratinServiceSelect = document.getElementById('keratin-service-select');
  const haircutServiceSelect = document.getElementById('haircut-service-select');
  const blowoutServiceSelect = document.getElementById('blowout-service-select');

  // Lists & Counters
  const colorAddonsList = document.getElementById('color-addons-list');
  const treatmentsList = document.getElementById('treatments-list');
  const treatmentCounterEl = document.getElementById('treatment-counter');
  const aftercareList = document.getElementById('aftercare-list');

  // Guided consultation flow
  const clientNameInput = document.getElementById('client-name-input');
  const clientContactInput = document.getElementById('client-contact-input');
  const mobileStage5Ticket = document.getElementById('mobile-stage5-ticket');

  // Live Ticket Elements
  const heroTotalPriceEl = document.getElementById('hero-total-price');
  const depositPillEl = document.getElementById('deposit-amount');
  const cherryPaymentEl = document.getElementById('cherry-payment');
  const ticketDateEl = document.getElementById('ticket-date');
  const ticketHairRow = document.getElementById('ticket-hair-row');
  const ticketLaborRow = document.getElementById('ticket-labor-row');
  const ticketColorRow = document.getElementById('ticket-color-row');
  const ticketStylingRow = document.getElementById('ticket-styling-row');
  const ticketAftercareRow = document.getElementById('ticket-aftercare-row');
  const stylistProfitCard = document.getElementById('stylist-profit-card');
  const profitMarginPill = document.getElementById('profit-margin-pill');
  const profitDollarVal = document.getElementById('profit-dollar-val');
  const wholesaleDollarVal = document.getElementById('wholesale-dollar-val');
  const chairTimeVal = document.getElementById('chair-time-val');
  const printQuoteBtn = document.getElementById('btn-print-quote');
  const copyQuoteBtn = document.getElementById('btn-copy-quote');

  // Mobile Bottom Bar & Drawer
  const barTotalVal = document.getElementById('bar-total-val');
  const barDepositSub = document.getElementById('bar-deposit-sub');
  const openDrawerBtn = document.getElementById('open-drawer-btn');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
  const mobileDrawerContent = document.getElementById('mobile-drawer-content');
  const drawerTicketMount = document.getElementById('drawer-ticket-mount');
  const desktopTicketContainer = document.getElementById('desktop-ticket-container');
  const sharedTicketCard = document.getElementById('shared-ticket-card');

  // Initialize Date
  if (ticketDateEl) {
    const now = new Date();
    ticketDateEl.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.querySelector('.toast-msg').textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[char]);
  }

  // Responsive Drawer Mounting
  function checkTicketMount() {
    if (window.innerWidth < 1024) {
      const mobileTarget = state.currentStep === 5 && mobileStage5Ticket
        ? mobileStage5Ticket
        : drawerTicketMount;
      if (mobileTarget && sharedTicketCard && sharedTicketCard.parentElement !== mobileTarget) {
        mobileTarget.appendChild(sharedTicketCard);
      }
    } else {
      if (desktopTicketContainer && sharedTicketCard && sharedTicketCard.parentElement !== desktopTicketContainer) {
        desktopTicketContainer.appendChild(sharedTicketCard);
        closeMobileDrawer();
      }
    }
  }

  window.addEventListener('resize', checkTicketMount);

  // Print hooks to prevent blank print on mobile
  window.addEventListener('beforeprint', () => {
    if (desktopTicketContainer && sharedTicketCard && sharedTicketCard.parentElement !== desktopTicketContainer) {
      desktopTicketContainer.appendChild(sharedTicketCard);
    }
  });

  window.addEventListener('afterprint', () => {
    checkTicketMount();
  });

  function openMobileDrawer() {
    if (drawerTicketMount && sharedTicketCard && sharedTicketCard.parentElement !== drawerTicketMount) {
      drawerTicketMount.appendChild(sharedTicketCard);
    }
    mobileDrawerOverlay.classList.add('active');
    mobileDrawerContent.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawerOverlay.classList.remove('active');
    mobileDrawerContent.classList.remove('active');
    document.body.style.overflow = '';
    if (window.innerWidth < 1024 && state.currentStep === 5 && mobileStage5Ticket && sharedTicketCard) {
      mobileStage5Ticket.appendChild(sharedTicketCard);
    }
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openMobileDrawer);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileDrawer);

  // ---- SERVICE PRICING PERSISTENCE HELPERS ----
  function getStoredServicePricing() {
    try { return JSON.parse(localStorage.getItem('atelier_service_pricing') || '{}'); } catch(e) { return {}; }
  }
  // Returns the 10-price array for a service ID, preferring localStorage override
  function getServicePrices(serviceId, defaultPrices) {
    const stored = getStoredServicePricing();
    return (stored[serviceId] && stored[serviceId].length === 10) ? stored[serviceId] : defaultPrices;
  }
  // Returns the bowl price for a named bowl type, preferring localStorage override
  function getBowlPrice(bowlId) {
    if (!bowlId) return 25; // legacy fallback
    const storedPricing = getStoredServicePricing();
    if (storedPricing[bowlId] && storedPricing[bowlId].length === 10) {
      return storedPricing[bowlId][0]; // bowls are flat across levels; use L1
    }
    const bowlDef = (window.ADDITIONAL_BOWLS || []).find(b => b.id === bowlId);
    return bowlDef ? bowlDef.price : 25;
  }

  // Calculation Engine
  function calculateQuote() {
    let totalHairRetail = 0;
    let totalHairWholesale = 0;
    let totalHairGrams = 0;
    let hairSpecItems = [];

    let totalLaborCost = 0;
    let laborSpecItems = [];
    let extensionChairHours = 0;

    const levelIdx = state.stylistLevel - 1;
    const levelObj = window.STYLIST_LEVELS.find(l => l.level === state.stylistLevel) || window.STYLIST_LEVELS[4];

    // 1. Process Extension Entries
    if (state.mode !== 'color') {
      state.extensionEntries.forEach((entry, idx) => {
        const method = window.EXTENSION_METHODS.find(m => m.id === entry.methodId) || window.EXTENSION_METHODS[0];
        
        // Filter brands strictly matching this method (from editable catalog)
        const _hc = getHairCatalog();
        const matchingBrands = _hc.filter(b => b.types.some(t => t.method === entry.methodId));
        const activeBrand = matchingBrands.find(b => b.id === entry.brandId) || matchingBrands[0] || _hc[0];
        
        // Filter types strictly matching this method
        const matchingTypes = activeBrand.types.filter(t => t.method === entry.methodId);
        const activeType = matchingTypes.find(t => t.id === entry.typeId) || matchingTypes[0] || activeBrand.types[0];
        
        // Filter length
        const activeLength = (activeType && activeType.lengths) 
          ? (activeType.lengths.find(l => l.length === entry.length) || activeType.lengths[0])
          : null;

        // Hair Cost
        if (entry.hairSourcing === 'salon' && activeLength) {
          const entryHairRetail = activeLength.price * entry.packs;
          const entryHairWholesale = activeLength.wholesale * entry.packs;
          const entryGrams = (activeLength.grams || 60) * entry.packs;

          totalHairRetail += entryHairRetail;
          totalHairWholesale += entryHairWholesale;
          totalHairGrams += entryGrams;

          const prefix = state.extensionEntries.length > 1 ? `#${idx + 1} ` : '';
          hairSpecItems.push(`${prefix}${activeBrand.name} ${activeType.name} • ${activeLength.length.replace(' inch', '″')} (${entry.packs} pk • ${entryGrams}g)`);
        } else {
          const prefix = state.extensionEntries.length > 1 ? `#${idx + 1} ` : '';
          hairSpecItems.push(`${prefix}${method.name} (Client Provided Hair)`);
        }

        // Labor Cost
        const baseLabor = method.serviceRates[entry.serviceType][levelIdx];
        let entryLabor = 0;
        if (method.id === 'weft') {
          entryLabor = baseLabor * entry.units;
          extensionChairHours += (entry.units * 0.9);
        } else if (method.id === 'tape-in') {
          entryLabor = Math.round(baseLabor * (entry.units / 40));
          extensionChairHours += (entry.units / 25);
        } else if (method.id === 'fusion') {
          entryLabor = Math.round(baseLabor * (entry.units / 100));
          extensionChairHours += (entry.units / 35);
        } else {
          entryLabor = baseLabor * entry.units;
          extensionChairHours += (entry.units * 1.5);
        }

        totalLaborCost += entryLabor;
        const serviceLabel = entry.serviceType === 'newInstall' ? 'New Install' : 'Maintenance';
        laborSpecItems.push(`${method.name} (${entry.units} ${method.unitType || 'units'}, ${serviceLabel})`);
      });
    }

    // 2. Process Color & Formulation
    let colorCost = 0;
    let colorProductWholesale = 0;
    let colorSpecs = [];
    let colorChairHours = 0;

    const colorLevelIdx = state.colorStylistLevel - 1;

    // Extra bowl logic incorporating Application Type (Root-to-Tip vs Touch-Up)
    let extraBowls = 0;
    if (state.primaryColorServiceId) {
      if (state.colorApplication === 'touch-up') {
        // Touch Up: standard root growth requires fewer bowls.
        // Extreme density (8-10) requires 1 extra bowl for root saturation.
        if (state.hairDensityDifficulty >= 8) {
          extraBowls = 1;
        }
      } else {
        // Root-to-tip full saturation:
        // Length factor
        if (state.hairLengthProfile === 'long') extraBowls += 1;
        else if (state.hairLengthProfile === 'extralong') extraBowls += 2;

        // Density & Complexity factor (1-10)
        if (state.hairDensityDifficulty >= 5 && state.hairDensityDifficulty <= 7) {
          extraBowls += 1;
        } else if (state.hairDensityDifficulty >= 8) {
          extraBowls += 2;
        }
      }
    }
    state.extraBowls = extraBowls;

    if (state.mode !== 'extensions') {
      // Primary Service (level-scaled, localStorage overrides defaults)
      if (state.primaryColorServiceId) {
        const primaryService = window.COLOR_SERVICES.find(s => s.id === state.primaryColorServiceId);
        if (primaryService) {
          const levelPrices = getServicePrices(primaryService.id, primaryService.basePrices);
          const servicePrice = levelPrices[colorLevelIdx];
          colorCost += servicePrice;
          colorProductWholesale += 18;
          colorChairHours += 2.0;
          colorSpecs.push(primaryService.name);
        }
      }

      // Extra Bowls — use named bowl type price instead of flat $25
      if (extraBowls > 0 && state.primaryColorServiceId) {
        const primaryService = window.COLOR_SERVICES.find(s => s.id === state.primaryColorServiceId);
        const bowlId = primaryService ? primaryService.billBowlsAs : null;
        const bowlUnitPrice = getBowlPrice(bowlId);
        const bowlCharge = extraBowls * bowlUnitPrice;
        const bowlTypeName = bowlId
          ? ((window.ADDITIONAL_BOWLS || []).find(b => b.id === bowlId) || {}).name || 'Extra Color'
          : 'Extra Color';
        colorCost += bowlCharge;
        colorProductWholesale += extraBowls * 12;
        colorSpecs.push(`${bowlTypeName} (${extraBowls}×)`);
      }

      // Add-ons — level-scaled for toner/lowlights/gray/color-remover variants
      state.selectedAddons.forEach(addonId => {
        const addon = window.COLOR_ADDONS.find(a => a.id === addonId);
        if (addon) {
          const addonPrices = addon.basePrices || Array(10).fill(addon.price);
          const addonPrice = addonPrices[colorLevelIdx];
          colorCost += addonPrice;
          colorProductWholesale += 8;
          colorSpecs.push(addon.name);
        }
      });

      // Luxury Treatments
      state.selectedTreatments.forEach(treatId => {
        const treat = window.LUXURY_TREATMENTS.find(t => t.id === treatId);
        if (treat) {
          colorCost += treat.price;
          colorProductWholesale += 10;
          colorSpecs.push(treat.name);
        }
      });
    }

    // 3. Process Standalone Services (Keratin, Haircut, Blowout)
    let stylingCost = 0;
    let stylingWholesale = 0;
    let stylingSpecs = [];
    let stylingChairHours = 0;

    if (state.mode !== 'extensions') {
      if (state.selectedKeratinId) {
        const keratin = (window.KERATIN_SERVICES || []).find(k => k.id === state.selectedKeratinId);
        if (keratin) {
          const keratinPrices = keratin.basePrices || Array(10).fill(keratin.price || 0);
          const keratinPrice = getServicePrices(keratin.id, keratinPrices)[colorLevelIdx];
          if (keratinPrice > 0) {
            stylingCost += keratinPrice;
            stylingWholesale += keratin.wholesale || 0;
            stylingChairHours += keratin.chairHours || 1.5;
            stylingSpecs.push(keratin.name);
          }
        }
      }

      if (state.selectedHaircutId) {
        const cut = (window.HAIRCUT_SERVICES || []).find(c => c.id === state.selectedHaircutId);
        if (cut) {
          const cutPrices = cut.basePrices || Array(10).fill(cut.price || 0);
          const cutPrice = getServicePrices(cut.id, cutPrices)[colorLevelIdx];
          if (cutPrice > 0) {
            stylingCost += cutPrice;
            stylingWholesale += cut.wholesale || 0;
            stylingChairHours += cut.chairHours || 0.75;
            stylingSpecs.push(cut.name);
          }
        }
      }

      if (state.selectedBlowoutId) {
        const blow = (window.BLOWOUT_SERVICES || []).find(b => b.id === state.selectedBlowoutId);
        if (blow) {
          const blowPrices = blow.basePrices || Array(10).fill(blow.price || 0);
          const blowPrice = getServicePrices(blow.id, blowPrices)[colorLevelIdx];
          if (blowPrice > 0) {
            stylingCost += blowPrice;
            stylingWholesale += blow.wholesale || 0;
            stylingChairHours += blow.chairHours || 0.75;
            stylingSpecs.push(blow.name);
          }
        }
      }
    }

    // 4. Process Retail Aftercare
    let aftercareCost = 0;
    let aftercareWholesale = 0;
    let aftercareSpecs = [];
    state.selectedAftercare.forEach(prodId => {
      const prod = getStylingProducts().find(p => p.id === prodId && p.active !== false);
      if (prod) {
        aftercareCost += prod.price;
        aftercareWholesale += prod.wholesale;
        aftercareSpecs.push(prod.name);
      }
    });

    // 5. Total Financial Summary
    const totalInvestment = totalHairRetail + totalLaborCost + colorCost + stylingCost + aftercareCost;
    const totalWholesale = totalHairWholesale + colorProductWholesale + stylingWholesale + aftercareWholesale;
    const netProfit = totalInvestment - totalWholesale;
    const profitMargin = totalInvestment > 0 ? Math.round((netProfit / totalInvestment) * 100) : 0;
    const depositRequired = Math.round(totalInvestment * 0.5);
    const cherryInstallment = Math.round(totalInvestment / 4);

    let totalChairHours = extensionChairHours + colorChairHours + stylingChairHours;
    totalChairHours = Math.max(1, Math.round(totalChairHours * 2) / 2);

    return {
      totalHairRetail,
      totalHairWholesale,
      totalHairGrams,
      hairSpecItems,
      totalLaborCost,
      laborSpecItems,
      levelObj,
      colorCost,
      colorSpecs,
      extraBowls,
      stylingCost,
      stylingSpecs,
      aftercareCost,
      aftercareSpecs,
      totalInvestment,
      totalWholesale,
      netProfit,
      profitMargin,
      depositRequired,
      cherryInstallment,
      totalChairHours
    };
  }

  // Update Live Ticket UI
  function updateTicketUI() {
    const q = calculateQuote();

    const formattedTotal = `$${q.totalInvestment.toLocaleString('en-US')}`;
    const formattedDeposit = `50% Deposit: $${q.depositRequired.toLocaleString('en-US')}`;

    if (heroTotalPriceEl) heroTotalPriceEl.textContent = formattedTotal;
    if (depositPillEl) depositPillEl.textContent = formattedDeposit;
    if (cherryPaymentEl) cherryPaymentEl.textContent = `or 4 interest-free payments of $${q.cherryInstallment} with Cherry / Afterpay`;

    // Mobile Bottom Bar Sync
    if (barTotalVal) barTotalVal.textContent = formattedTotal;
    if (barDepositSub) barDepositSub.textContent = formattedDeposit;

    // Hair Breakdown Row
    if (ticketHairRow) {
      if (state.mode === 'color') {
        ticketHairRow.style.display = 'none';
      } else {
        ticketHairRow.style.display = 'flex';
        ticketHairRow.querySelector('.row-spec').textContent = q.hairSpecItems.length > 0 
          ? q.hairSpecItems.join(' • ') 
          : 'Service Only';
        ticketHairRow.querySelector('.row-cost').textContent = q.totalHairRetail > 0 
          ? `$${q.totalHairRetail.toLocaleString('en-US')}` 
          : '$0';
      }
    }

    // Labor Breakdown Row
    if (ticketLaborRow) {
      if (state.mode === 'color') {
        ticketLaborRow.style.display = 'none';
      } else {
        ticketLaborRow.style.display = 'flex';
        const summaryText = q.laborSpecItems.length > 0 
          ? `${q.laborSpecItems.join(' + ')} • ${q.levelObj.title}`
          : q.levelObj.title;
        ticketLaborRow.querySelector('.row-spec').textContent = summaryText;
        ticketLaborRow.querySelector('.row-cost').textContent = `$${q.totalLaborCost.toLocaleString('en-US')}`;
      }
    }

    // Color Breakdown Row
    if (ticketColorRow) {
      if (state.mode === 'extensions' || q.colorCost === 0) {
        ticketColorRow.style.display = 'none';
      } else {
        ticketColorRow.style.display = 'flex';
        ticketColorRow.querySelector('.row-spec').textContent = q.colorSpecs.join(', ');
        ticketColorRow.querySelector('.row-cost').textContent = `$${q.colorCost.toLocaleString('en-US')}`;
      }
    }

    // Styling Services Row (Keratin, Haircut, Blowout)
    if (ticketStylingRow) {
      if (state.mode === 'extensions' || q.stylingCost === 0) {
        ticketStylingRow.style.display = 'none';
      } else {
        ticketStylingRow.style.display = 'flex';
        ticketStylingRow.querySelector('.row-spec').textContent = q.stylingSpecs.join(', ');
        ticketStylingRow.querySelector('.row-cost').textContent = `$${q.stylingCost.toLocaleString('en-US')}`;
      }
    }

    // Aftercare Row
    if (ticketAftercareRow) {
      if (q.aftercareCost === 0) {
        ticketAftercareRow.style.display = 'none';
      } else {
        ticketAftercareRow.style.display = 'flex';
        ticketAftercareRow.querySelector('.row-spec').textContent = q.aftercareSpecs.join(', ');
        ticketAftercareRow.querySelector('.row-cost').textContent = `$${q.aftercareCost.toLocaleString('en-US')}`;
      }
    }

    // Stylist Profit Card
    if (stylistProfitCard) {
      if (state.viewMode === 'stylist') {
        stylistProfitCard.style.display = 'block';
        profitMarginPill.textContent = `${q.profitMargin}% Margin`;
        profitDollarVal.textContent = `$${q.netProfit.toLocaleString('en-US')}`;
        wholesaleDollarVal.textContent = `$${q.totalWholesale.toLocaleString('en-US')}`;
        chairTimeVal.textContent = `~${q.totalChairHours} Hours`;
      } else {
        stylistProfitCard.style.display = 'none';
      }
    }

    // Bowl Formula Description
    if (bowlCalcDesc) {
      const extra = q.extraBowls;
      if (!state.primaryColorServiceId) {
        bowlCalcDesc.textContent = "No primary color service selected (0 base bowls).";
      } else if (state.colorApplication === 'touch-up') {
        if (extra === 0) {
          bowlCalcDesc.textContent = "Touch-Up formulation: 1 standard base bowl included for base root growth.";
        } else {
          bowlCalcDesc.textContent = `Touch-Up formulation for ultra-dense regrowth (difficulty ${state.hairDensityDifficulty}/10): +1 extra bowl automatically included (+$25).`;
        }
      } else {
        if (extra === 0) {
          bowlCalcDesc.textContent = "Standard full saturation: 1 base bowl included for this service.";
        } else {
          bowlCalcDesc.textContent = `Full saturation based on ${state.hairLengthProfile} length & difficulty level ${state.hairDensityDifficulty}/10: +${extra} extra bowl${extra > 1 ? 's' : ''} automatically included (+$${extra * 25}).`;
        }
      }
    }

    // Treatments Counter & Disabled Excess Enforcement
    renderTreatmentLimits();
  }

  // Multi-Method Extension Entries Renderer
  function renderExtensionEntries() {
    if (!extensionEntriesContainer) return;
    extensionEntriesContainer.innerHTML = '';

    state.extensionEntries.forEach((entry, idx) => {
      const activeMethod = window.EXTENSION_METHODS.find(m => m.id === entry.methodId) || window.EXTENSION_METHODS[0];

      // Filter brands that actually offer this method (from editable catalog)
      const _cat = getHairCatalog();
      const matchingBrands = _cat.filter(b => b.types.some(t => t.method === entry.methodId));
      if (!matchingBrands.some(b => b.id === entry.brandId)) {
        entry.brandId = matchingBrands[0] ? matchingBrands[0].id : (_cat[0] ? _cat[0].id : '');
      }
      const activeBrand = matchingBrands.find(b => b.id === entry.brandId) || matchingBrands[0] || _cat[0];

      // Filter types strictly by method
      const matchingTypes = activeBrand.types.filter(t => t.method === entry.methodId);
      if (!matchingTypes.some(t => t.id === entry.typeId)) {
        entry.typeId = matchingTypes[0] ? matchingTypes[0].id : activeBrand.types[0].id;
      }
      const activeType = matchingTypes.find(t => t.id === entry.typeId) || matchingTypes[0] || activeBrand.types[0];

      // Filter length
      if (activeType && activeType.lengths) {
        if (!activeType.lengths.some(l => l.length === entry.length)) {
          entry.length = activeType.lengths[0].length;
        }
      }
      const activeLength = activeType && activeType.lengths 
        ? (activeType.lengths.find(l => l.length === entry.length) || activeType.lengths[0])
        : null;

      // Create Entry Card
      const card = document.createElement('div');
      card.className = 'extension-entry-card';

      // Header row
      const headerRow = document.createElement('div');
      headerRow.className = 'entry-card-header';
      headerRow.innerHTML = `
        <div class="entry-card-title">
          <span class="badge-pill" style="font-size:0.65rem;">Method #${idx + 1}</span>
          <span>${activeMethod.name}</span>
        </div>
        ${state.extensionEntries.length > 1 ? `<button type="button" class="btn-remove-entry" data-entry-id="${entry.id}">✕ Remove</button>` : ''}
      `;
      card.appendChild(headerRow);

      // 1. Method Selector Dropdown
      const methodGroup = document.createElement('div');
      methodGroup.className = 'form-group';
      methodGroup.innerHTML = `
        <label class="form-label">Extension Method</label>
        <div class="method-dropdown-container">
          <div class="method-trigger" data-entry-id="${entry.id}">
            <div class="method-selected-preview">
              <img src="${activeMethod.image}" alt="${activeMethod.name}" class="method-thumb">
              <div>
                <div class="method-meta-title">${activeMethod.name}</div>
                <div class="method-meta-sub">${activeMethod.subtitle}</div>
              </div>
            </div>
            <div class="method-trigger-right">
              <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <div class="method-menu" data-menu-id="${entry.id}"></div>
        </div>
      `;
      card.appendChild(methodGroup);

      // Populate Method Menu items
      const menuEl = methodGroup.querySelector(`[data-menu-id="${entry.id}"]`);
      const triggerEl = methodGroup.querySelector(`[data-entry-id="${entry.id}"]`);

      window.EXTENSION_METHODS.forEach(m => {
        const item = document.createElement('div');
        item.className = `method-option-item ${m.id === entry.methodId ? 'active' : ''}`;
        item.innerHTML = `
          <div class="method-option-left">
            <img src="${m.image}" alt="${m.name}" class="method-option-thumb">
            <div class="method-option-text">
              <h5>${m.name}</h5>
              <p>${m.description}</p>
            </div>
          </div>
        `;
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          entry.methodId = m.id;
          entry.units = m.defaultUnits;
          renderExtensionEntries();
          updateTicketUI();
        });
        menuEl.appendChild(item);
      });

      triggerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = triggerEl.classList.contains('open');
        // Close all other open method triggers
        document.querySelectorAll('.method-trigger.open').forEach(t => t.classList.remove('open'));
        document.querySelectorAll('.method-menu.open').forEach(m => m.classList.remove('open'));
        if (!isOpen) {
          triggerEl.classList.add('open');
          menuEl.classList.add('open');
        }
      });

      // 2. Service Type Toggle-Pair
      const serviceTypeGroup = document.createElement('div');
      serviceTypeGroup.className = 'form-group';
      serviceTypeGroup.innerHTML = `
        <label class="form-label">Service Type</label>
        <div class="toggle-group">
          <button type="button" class="toggle-btn ${entry.serviceType === 'newInstall' ? 'active' : ''}" data-val="newInstall">✦ New Installation</button>
          <button type="button" class="toggle-btn ${entry.serviceType === 'maintenance' ? 'active' : ''}" data-val="maintenance">↺ Maintenance / Move-Up</button>
        </div>
      `;
      serviceTypeGroup.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          entry.serviceType = btn.dataset.val;
          renderExtensionEntries();
          updateTicketUI();
        });
      });
      card.appendChild(serviceTypeGroup);

      // 3. Method-Driven Unit Button Tile Grid
      const unitGroup = document.createElement('div');
      unitGroup.className = 'form-group';
      unitGroup.innerHTML = `<label class="form-label">Installation Density / Units (${activeMethod.unitType || 'units'})</label>`;
      const unitGrid = document.createElement('div');
      unitGrid.className = 'unit-tile-grid';

      activeMethod.unitOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `unit-tile-btn ${opt.value === entry.units ? 'active' : ''}`;
        btn.setAttribute('aria-pressed', String(opt.value === entry.units));

        const labelMatch = opt.label.match(/^([^()]+?)(?:\s*\((.+)\))?$/);
        const title = document.createElement('span');
        title.className = 'unit-tile-title';
        title.textContent = labelMatch?.[1]?.trim() || opt.label;
        btn.appendChild(title);

        if (labelMatch?.[2]) {
          const detail = document.createElement('span');
          detail.className = 'unit-tile-detail';
          detail.textContent = labelMatch[2].trim();
          btn.appendChild(detail);
        }

        const check = document.createElement('span');
        check.className = 'unit-tile-check';
        check.setAttribute('aria-hidden', 'true');
        check.textContent = '✓';
        btn.appendChild(check);
        btn.addEventListener('click', () => {
          entry.units = opt.value;
          renderExtensionEntries();
          updateTicketUI();
        });
        unitGrid.appendChild(btn);
      });
      unitGroup.appendChild(unitGrid);
      card.appendChild(unitGroup);

      // 4. Hair Sourcing Toggle-Pair
      const sourcingGroup = document.createElement('div');
      sourcingGroup.className = 'form-group';
      sourcingGroup.innerHTML = `
        <label class="form-label">Hair Procurement</label>
        <div class="toggle-group">
          <button type="button" class="toggle-btn ${entry.hairSourcing === 'salon' ? 'active' : ''}" data-val="salon">Salon Supplies Hair (Direct Catalog)</button>
          <button type="button" class="toggle-btn ${entry.hairSourcing === 'client' ? 'active' : ''}" data-val="client">Client Supplies Hair (Service Only)</button>
        </div>
      `;
      sourcingGroup.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          entry.hairSourcing = btn.dataset.val;
          renderExtensionEntries();
          updateTicketUI();
        });
      });
      card.appendChild(sourcingGroup);

      // 5. Purchasing Fields vs Service-Only Callout
      if (entry.hairSourcing === 'salon') {
        const purchasingWrap = document.createElement('div');
        purchasingWrap.className = 'hair-purchasing-fields';

        // Brand & Type Row
        const brandTypeRow = document.createElement('div');
        brandTypeRow.className = 'two-col-grid';

        // Brand Select
        const brandCol = document.createElement('div');
        brandCol.className = 'form-group';
        brandCol.innerHTML = `<label class="form-label">Hair Brand</label><select class="select-control"></select>`;
        const bSelect = brandCol.querySelector('select');
        matchingBrands.forEach(b => {
          const opt = document.createElement('option');
          opt.value = b.id;
          opt.textContent = b.name;
          if (b.id === entry.brandId) opt.selected = true;
          bSelect.appendChild(opt);
        });
        bSelect.addEventListener('change', (e) => {
          entry.brandId = e.target.value;
          renderExtensionEntries();
          updateTicketUI();
        });
        brandTypeRow.appendChild(brandCol);

        // Type Select
        const typeCol = document.createElement('div');
        typeCol.className = 'form-group';
        typeCol.innerHTML = `<label class="form-label">Weft / Strand Construction</label><select class="select-control"></select>`;
        const tSelect = typeCol.querySelector('select');
        matchingTypes.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t.id;
          opt.textContent = t.name;
          if (t.id === entry.typeId) opt.selected = true;
          tSelect.appendChild(opt);
        });
        tSelect.addEventListener('change', (e) => {
          entry.typeId = e.target.value;
          renderExtensionEntries();
          updateTicketUI();
        });
        brandTypeRow.appendChild(typeCol);
        purchasingWrap.appendChild(brandTypeRow);

        // Length & Pack Stepper Row
        const lengthPackRow = document.createElement('div');
        lengthPackRow.className = 'two-col-grid';

        // Length Select
        const lengthCol = document.createElement('div');
        lengthCol.className = 'form-group';
        lengthCol.innerHTML = `<label class="form-label">Target Length</label><select class="select-control"></select>`;
        const lSelect = lengthCol.querySelector('select');
        if (activeType && activeType.lengths) {
          activeType.lengths.forEach(l => {
            const opt = document.createElement('option');
            opt.value = l.length;
            opt.textContent = `${l.length.replace(' inch', '″')} (${l.packUnit || l.grams + 'g'}) — $${l.price}`;
            if (l.length === entry.length) opt.selected = true;
            lSelect.appendChild(opt);
          });
        }
        lSelect.addEventListener('change', (e) => {
          entry.length = e.target.value;
          renderExtensionEntries();
          updateTicketUI();
        });
        lengthPackRow.appendChild(lengthCol);

        // Pack Stepper
        const packCol = document.createElement('div');
        packCol.className = 'form-group';
        const perPackGrams = (activeLength && activeLength.grams) ? activeLength.grams : 60;
        packCol.innerHTML = `
          <label class="form-label">Hair Packs Required</label>
          <div class="pack-stepper-wrap">
            <div>
              <div class="stepper-info-sub">${entry.packs * perPackGrams}g Hair (${perPackGrams}g/pack)</div>
            </div>
            <div class="stepper-controls">
              <button type="button" class="step-btn pack-minus">−</button>
              <span class="step-value">${entry.packs}</span>
              <button type="button" class="step-btn pack-plus">+</button>
            </div>
          </div>
        `;
        packCol.querySelector('.pack-minus').addEventListener('click', () => {
          if (entry.packs > 1) {
            entry.packs--;
            renderExtensionEntries();
            updateTicketUI();
          }
        });
        packCol.querySelector('.pack-plus').addEventListener('click', () => {
          if (entry.packs < 12) {
            entry.packs++;
            renderExtensionEntries();
            updateTicketUI();
          }
        });
        lengthPackRow.appendChild(packCol);

        purchasingWrap.appendChild(lengthPackRow);
        card.appendChild(purchasingWrap);
      } else {
        // Service Only Callout
        const serviceOnlyEl = document.createElement('div');
        serviceOnlyEl.className = 'service-only-callout';
        serviceOnlyEl.innerHTML = `✦ <strong>Service Only:</strong> Client supplies own hair extensions. Purchasing fields are hidden and hair investment is billed at <strong>$0</strong>.`;
        card.appendChild(serviceOnlyEl);
      }

      // Remove Entry Click Handler
      const removeBtn = card.querySelector('.btn-remove-entry');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          if (state.extensionEntries.length > 1) {
            state.extensionEntries = state.extensionEntries.filter(e => e.id !== entry.id);
            renderExtensionEntries();
            updateTicketUI();
            showToast('Method removed.');
          }
        });
      }

      extensionEntriesContainer.appendChild(card);
    });
  }

  // Global click outside to close open method dropdowns
  document.addEventListener('click', () => {
    document.querySelectorAll('.method-trigger.open').forEach(t => t.classList.remove('open'));
    document.querySelectorAll('.method-menu.open').forEach(m => m.classList.remove('open'));
  });

  // Add Multiple Method Entry Button
  if (btnAddMethod) {
    btnAddMethod.addEventListener('click', () => {
      // Pick next smart default method (e.g. if weft is primary, add tape-in hybrid)
      const existingMethods = state.extensionEntries.map(e => e.methodId);
      let newMethodId = 'tape-in';
      if (existingMethods.includes('tape-in') && !existingMethods.includes('fusion')) {
        newMethodId = 'fusion';
      } else if (existingMethods.includes('fusion') && !existingMethods.includes('topper')) {
        newMethodId = 'topper';
      }

      const methodObj = window.EXTENSION_METHODS.find(m => m.id === newMethodId) || window.EXTENSION_METHODS[1];
      const _addCat = getHairCatalog();
      const matchingBrands = _addCat.filter(b => b.types.some(t => t.method === newMethodId));
      const defaultBrand = matchingBrands[0] || _addCat[0];
      const defaultType = defaultBrand.types.find(t => t.method === newMethodId) || defaultBrand.types[0];
      const defaultLength = (defaultType && defaultType.lengths && defaultType.lengths[0]) 
        ? defaultType.lengths[0].length 
        : '20 inch';

      state.extensionEntries.push({
        id: state.nextEntryId++,
        methodId: newMethodId,
        serviceType: 'newInstall',
        units: methodObj.defaultUnits,
        hairSourcing: 'salon',
        brandId: defaultBrand.id,
        typeId: defaultType ? defaultType.id : '',
        length: defaultLength,
        packs: 2
      });

      renderExtensionEntries();
      updateTicketUI();
      showToast(`Added ${methodObj.name} entry.`);
    });
  }

  // Extensionist Stylist Seniority Slider
  if (tierSlider) {
    tierSlider.addEventListener('input', (e) => {
      state.stylistLevel = parseInt(e.target.value, 10);
      const levelObj = window.STYLIST_LEVELS.find(l => l.level === state.stylistLevel);
      if (levelObj) {
        tierTitleEl.textContent = levelObj.title;
        tierExpEl.textContent = levelObj.exp;
      }
      updateTicketUI();
    });
  }

  // Independent Colorist Stylist Seniority Slider
  if (colorTierSlider) {
    colorTierSlider.addEventListener('input', (e) => {
      state.colorStylistLevel = parseInt(e.target.value, 10);
      const levelObj = window.STYLIST_LEVELS.find(l => l.level === state.colorStylistLevel);
      if (levelObj) {
        colorTierTitleEl.textContent = COLORIST_TITLES[state.colorStylistLevel] || levelObj.title;
        colorTierExpEl.textContent = levelObj.exp;
      }
      updateTicketUI();
    });
  }

  // Color Application Type Toggle
  if (applicationToggleGroup) {
    applicationToggleGroup.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        applicationToggleGroup.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.colorApplication = btn.dataset.val;
        updateTicketUI();
      });
    });
  }

  // Client Hair Length & 1-10 Density Selects
  if (clientLengthSelect) {
    clientLengthSelect.addEventListener('change', (e) => {
      state.hairLengthProfile = e.target.value;
      updateTicketUI();
    });
  }

  if (clientDensitySelect) {
    clientDensitySelect.addEventListener('change', (e) => {
      state.hairDensityDifficulty = parseInt(e.target.value, 10);
      updateTicketUI();
    });
  }

  // Primary Color Service Select
  if (colorServiceSelect) {
    colorServiceSelect.addEventListener('change', (e) => {
      state.primaryColorServiceId = e.target.value;
      updateTicketUI();
    });
  }

  // Standalone Services Selects (Keratin, Haircut, Blowout)
  function populateStandaloneServices() {
    if (keratinServiceSelect && window.KERATIN_SERVICES) {
      keratinServiceSelect.innerHTML = '';
      window.KERATIN_SERVICES.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k.id;
        opt.textContent = k.name;
        if (k.id === state.selectedKeratinId) opt.selected = true;
        keratinServiceSelect.appendChild(opt);
      });
      keratinServiceSelect.addEventListener('change', (e) => {
        state.selectedKeratinId = e.target.value;
        updateTicketUI();
      });
    }

    if (haircutServiceSelect && window.HAIRCUT_SERVICES) {
      haircutServiceSelect.innerHTML = '';
      window.HAIRCUT_SERVICES.forEach(h => {
        const opt = document.createElement('option');
        opt.value = h.id;
        opt.textContent = h.name;
        if (h.id === state.selectedHaircutId) opt.selected = true;
        haircutServiceSelect.appendChild(opt);
      });
      haircutServiceSelect.addEventListener('change', (e) => {
        state.selectedHaircutId = e.target.value;
        updateTicketUI();
      });
    }

    if (blowoutServiceSelect && window.BLOWOUT_SERVICES) {
      blowoutServiceSelect.innerHTML = '';
      window.BLOWOUT_SERVICES.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = b.name;
        if (b.id === state.selectedBlowoutId) opt.selected = true;
        blowoutServiceSelect.appendChild(opt);
      });
      blowoutServiceSelect.addEventListener('change', (e) => {
        state.selectedBlowoutId = e.target.value;
        updateTicketUI();
      });
    }
  }

  // Render Color Add-Ons
  function renderColorAddons() {
    if (!colorAddonsList) return;
    colorAddonsList.innerHTML = '';
    window.COLOR_ADDONS.forEach(addon => {
      const row = document.createElement('div');
      const isChecked = state.selectedAddons.has(addon.id);
      row.className = `addon-checkbox-row ${isChecked ? 'checked' : ''}`;
      row.innerHTML = `
        <div class="addon-left">
          <div class="custom-checkbox">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div class="addon-name">${addon.name}</div>
            <div class="addon-desc">${addon.description}</div>
          </div>
        </div>
        <div class="addon-price">+$${addon.price}</div>
      `;
      row.addEventListener('click', () => {
        if (state.selectedAddons.has(addon.id)) state.selectedAddons.delete(addon.id);
        else state.selectedAddons.add(addon.id);
        renderColorAddons();
        updateTicketUI();
      });
      colorAddonsList.appendChild(row);
    });
  }

  // Render Luxury Treatments (Max 3 Enforced)
  function renderTreatments() {
    if (!treatmentsList) return;
    treatmentsList.innerHTML = '';
    window.LUXURY_TREATMENTS.forEach(treat => {
      const row = document.createElement('div');
      const isChecked = state.selectedTreatments.has(treat.id);
      const isMaxReached = state.selectedTreatments.size >= 3 && !isChecked;
      row.className = `addon-checkbox-row ${isChecked ? 'checked' : ''} ${isMaxReached ? 'disabled' : ''}`;
      row.dataset.treatId = treat.id;
      row.innerHTML = `
        <div class="addon-left">
          <div class="custom-checkbox">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div class="addon-name">${treat.name}</div>
            <div class="addon-desc">${treat.description}</div>
          </div>
        </div>
        <div class="addon-price">+$${treat.price}</div>
      `;
      row.addEventListener('click', () => {
        if (state.selectedTreatments.has(treat.id)) {
          state.selectedTreatments.delete(treat.id);
          renderTreatments();
          updateTicketUI();
        } else {
          if (state.selectedTreatments.size >= 3) {
            showToast('Maximum 3 luxury treatments per consultation.');
            return;
          }
          state.selectedTreatments.add(treat.id);
          renderTreatments();
          updateTicketUI();
        }
      });
      treatmentsList.appendChild(row);
    });
    renderTreatmentLimits();
  }

  function renderTreatmentLimits() {
    if (treatmentCounterEl) {
      treatmentCounterEl.textContent = `Up to 3 • ${state.selectedTreatments.size} selected`;
    }
  }

  // Render Aftercare Products (from editable catalog, active only)
  function renderAftercare() {
    if (!aftercareList) return;
    aftercareList.innerHTML = '';
    getStylingProducts().filter(p => p.active !== false).forEach(prod => {
      const card = document.createElement('div');
      const isAdded = state.selectedAftercare.has(prod.id);
      card.className = `product-item-card ${isAdded ? 'added' : ''}`;
      card.innerHTML = `
        <div>
          <div class="prod-name">${prod.name} ${prod.popular ? '★' : ''}</div>
          <div class="prod-sub">${prod.description}</div>
        </div>
        <div style="text-align:right;">
          <div class="prod-price">+$${prod.price}</div>
          <span style="font-size:0.72rem; color:${isAdded ? 'var(--accent-yellow)' : 'var(--text-muted)'}; font-weight:700;">
            ${isAdded ? '✓ Added' : '+ Add'}
          </span>
        </div>
      `;
      card.addEventListener('click', () => {
        if (state.selectedAftercare.has(prod.id)) state.selectedAftercare.delete(prod.id);
        else state.selectedAftercare.add(prod.id);
        renderAftercare();
        updateTicketUI();
      });
      aftercareList.appendChild(card);
    });
  }

  // Mode Navigation Tabs
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      syncMode(tab.dataset.mode);
    });
  });

  // View Mode (Client vs Stylist)
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.viewMode = btn.dataset.view;
      showToast(state.viewMode === 'client' ? 'Client View Active' : 'Stylist Mode Active');
      updateTicketUI();
    });
  });

  // Copy Consultation Breakdown
  if (copyQuoteBtn) {
    copyQuoteBtn.addEventListener('click', () => {
      const q = calculateQuote();
      let lines = [
        '✦ ATELIER LUXURY CONSULTATION QUOTE ✦',
        `Total Investment: $${q.totalInvestment.toLocaleString()}`,
        `Deposit Required (50%): $${q.depositRequired.toLocaleString()}`,
        '----------------------------------------'
      ];

      if (state.mode !== 'color') {
        lines.push(`• Hair: ${q.hairSpecItems.join(' + ')} ($${q.totalHairRetail.toLocaleString()})`);
        lines.push(`• Installation: ${q.laborSpecItems.join(' + ')} ($${q.totalLaborCost.toLocaleString()})`);
      }

      if (state.mode !== 'extensions' && q.colorCost > 0) {
        lines.push(`• Color & Treatments: ${q.colorSpecs.join(', ')} ($${q.colorCost.toLocaleString()})`);
      }

      if (state.mode !== 'extensions' && q.stylingCost > 0) {
        lines.push(`• Keratin & Styling: ${q.stylingSpecs.join(', ')} ($${q.stylingCost.toLocaleString()})`);
      }

      if (q.aftercareCost > 0) {
        lines.push(`• Take-Home Care: ${q.aftercareSpecs.join(', ')} ($${q.aftercareCost.toLocaleString()})`);
      }

      lines.push('----------------------------------------');
      lines.push(`Pay in 4 with Cherry / Afterpay: $${q.cherryInstallment}/month`);

      const text = lines.join('\n');
      navigator.clipboard.writeText(text).then(() => {
        showToast('Quote copied to clipboard!');
      });
    });
  }

  // Print Quote
  if (printQuoteBtn) {
    printQuoteBtn.addEventListener('click', () => window.print());
  }

  // Reset Consultation Handler (Complete state restoration)
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset consultation to defaults?')) {
        state.mode = 'both';
        state.viewMode = 'stylist';
        state.clientName = '';
        state.clientContact = '';
        state.currentStep = 1;
        state.nextEntryId = 2;
        state.extensionEntries = [
          {
            id: 1,
            methodId: 'weft',
            serviceType: 'newInstall',
            units: 2,
            hairSourcing: 'salon',
            brandId: 'bellami',
            typeId: 'bellami-hand-tied',
            length: '22 inch',
            packs: 2
          }
        ];
        state.stylistLevel = 5;
        state.colorStylistLevel = 5;
        state.colorApplication = 'root-to-tip';
        state.hairLengthProfile = 'long';
        state.hairDensityDifficulty = 5;
        state.primaryColorServiceId = '';
        state.selectedKeratinId = '';
        state.selectedHaircutId = '';
        state.selectedBlowoutId = '';
        state.selectedAddons.clear();
        state.selectedAddons.add('root-smudge');
        state.selectedAddons.add('custom-tone');
        state.selectedTreatments.clear();
        state.selectedTreatments.add('k18');
        state.selectedAftercare.clear();
        state.selectedAftercare.add('kit-complete');

        // Reset UI Mode Tabs
        modeTabs.forEach(t => t.classList.toggle('active', t.dataset.mode === 'both'));
        viewBtns.forEach(b => b.classList.toggle('active', b.dataset.view === 'stylist'));

        // Reset Sliders
        if (tierSlider) {
          tierSlider.value = 5;
          tierTitleEl.textContent = window.STYLIST_LEVELS[4].title;
          tierExpEl.textContent = window.STYLIST_LEVELS[4].exp;
        }
        if (colorTierSlider) {
          colorTierSlider.value = 5;
          colorTierTitleEl.textContent = COLORIST_TITLES[5];
          colorTierExpEl.textContent = window.STYLIST_LEVELS[4].exp;
        }

        // Reset Color Form Controls
        if (applicationToggleGroup) {
          applicationToggleGroup.querySelectorAll('.toggle-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.val === 'root-to-tip');
          });
        }
        if (clientLengthSelect) clientLengthSelect.value = 'long';
        if (clientDensitySelect) clientDensitySelect.value = '5';
        if (colorServiceSelect) colorServiceSelect.value = '';
        if (keratinServiceSelect) keratinServiceSelect.value = '';
        if (haircutServiceSelect) haircutServiceSelect.value = '';
        if (blowoutServiceSelect) blowoutServiceSelect.value = '';
        if (clientNameInput) clientNameInput.value = '';
        if (clientContactInput) clientContactInput.value = '';

        // Re-render components
        renderExtensionEntries();
        renderColorAddons();
        renderTreatments();
        renderAftercare();
        updateTicketUI();
        goToStep(1);
        showToast('Consultation reset to defaults.');
      }
    });
  }

  // Theme Switching Logic
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
      document.body.classList.add('theme-light');
      if (themeIconSun) themeIconSun.style.display = 'none';
      if (themeIconMoon) themeIconMoon.style.display = 'block';
    } else {
      document.documentElement.classList.remove('theme-light');
      document.body.classList.remove('theme-light');
      if (themeIconSun) themeIconSun.style.display = 'block';
      if (themeIconMoon) themeIconMoon.style.display = 'none';
    }
    localStorage.setItem('atelier_theme', theme);
  }

  const currentTheme = localStorage.getItem('atelier_theme') || 'dark';
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const target = active === 'dark' ? 'light' : 'dark';
      applyTheme(target);
      showToast(target === 'light' ? 'Light Theme Active' : 'Dark Theme Active');
    });
  }

  // ============================================================
  // FIVE-STAGE GUIDED FLOW ENGINE
  // ============================================================

  // Returns the ordered list of visible step numbers based on mode
  function getVisibleSteps() {
    if (state.mode === 'color') return [1, 3, 4, 5];
    return [1, 2, 3, 4, 5];
  }

  // Generates a concise summary string for a completed stage
  function generateStageSummary(stage) {
    switch (stage) {
      case 1: {
        const modeLabel = { extensions: 'Extensions Only', color: 'Color Only', both: 'Extensions + Color' }[state.mode] || '';
        const client = state.clientName.trim() || 'New client';
        return `${client} · ${modeLabel}`;
      }
      case 2: {
        if (!state.extensionEntries || state.extensionEntries.length === 0) return 'No extensions';
        const entry = state.extensionEntries[0];
        const method = (window.EXTENSION_METHODS || []).find(m => m.id === entry.methodId);
        const methodName = method ? method.name : entry.methodId;
        const serviceLabel = entry.serviceType === 'newInstall' ? 'New Install' : 'Maintenance';
        const extra = state.extensionEntries.length > 1 ? ` +${state.extensionEntries.length - 1} more` : '';
        return `${methodName} · ${serviceLabel} · ${entry.units} ${method ? (method.unitType || 'units') : 'units'}${extra}`;
      }
      case 3: {
        const parts = [];
        if (state.mode !== 'color') parts.push(`Extensionist Lvl ${state.stylistLevel}`);
        if (state.mode !== 'extensions') parts.push(`Colorist Lvl ${state.colorStylistLevel}`);
        return parts.join(' · ');
      }
      case 4: {
        if (state.mode === 'extensions') {
          const count = state.selectedAftercare ? state.selectedAftercare.size : 0;
          return count ? `${count} take-home care item${count > 1 ? 's' : ''}` : 'No take-home care selected';
        }
        const parts = [];
        if (state.primaryColorServiceId) {
          const svc = (window.COLOR_SERVICES || []).find(s => s.id === state.primaryColorServiceId);
          if (svc) parts.push(svc.name);
        }
        if (state.selectedAddons && state.selectedAddons.size > 0) parts.push(`${state.selectedAddons.size} add-on${state.selectedAddons.size > 1 ? 's' : ''}`);
        if (state.selectedAftercare && state.selectedAftercare.size > 0) parts.push(`${state.selectedAftercare.size} aftercare`);
        return parts.join(' · ') || 'No color services';
      }
      default: return '';
    }
  }

  // Renders the top flow indicator dots
  function renderFlowIndicator() {
    const el = document.getElementById('flow-indicator');
    if (!el) return;
    const visibleSteps = getVisibleSteps();
    const labels = { 1: 'Client & Service', 2: 'Extension Detail', 3: 'Style Level', 4: 'Color & Add-Ons', 5: 'Review & Pricing' };
    const checkSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17L4 12"/></svg>`;
    el.innerHTML = visibleSteps.map((s, i) => {
      const status = s < state.currentStep ? 'completed' : s === state.currentStep ? 'current' : 'locked';
      const dotContent = status === 'completed' ? checkSvg : `<span>${s}</span>`;
      const connector = i < visibleSteps.length - 1
        ? `<div class="fi-connector ${s < state.currentStep ? 'filled' : ''}"></div>`
        : '';
      return `<div class="fi-step ${status}"><div class="fi-dot ${status}">${dotContent}</div><span class="fi-label">${labels[s]}</span></div>${connector}`;
    }).join('');
  }

  // Updates in-content section visibility based on mode (for extensions/color tiers, color section)
  function updateSectionVisibility() {
    const extTierWrap = document.getElementById('ext-tier-wrap');
    const colorTierWrap = document.getElementById('color-tier-wrap');
    const colorSection = document.getElementById('section-color');
    const stage2Item = document.getElementById('stage-item-2');

    if (state.mode === 'color') {
      if (extTierWrap) extTierWrap.style.display = 'none';
      if (colorTierWrap) colorTierWrap.style.display = '';
      if (colorSection) colorSection.style.display = '';
      if (stage2Item) stage2Item.style.display = 'none';
    } else if (state.mode === 'extensions') {
      if (extTierWrap) extTierWrap.style.display = '';
      if (colorTierWrap) colorTierWrap.style.display = 'none';
      if (colorSection) colorSection.style.display = 'none';
      if (stage2Item) stage2Item.style.display = '';
    } else {
      if (extTierWrap) extTierWrap.style.display = '';
      if (colorTierWrap) colorTierWrap.style.display = '';
      if (colorSection) colorSection.style.display = '';
      if (stage2Item) stage2Item.style.display = '';
    }
  }

  // Renders the review summaries inside Stage 5
  function renderReviewSummaries() {
    const el = document.getElementById('review-summaries');
    if (!el) return;
    const visibleSteps = getVisibleSteps().filter(s => s < 5);
    const labels = { 1: 'Client & Service', 2: 'Extension Detail', 3: 'Style Level', 4: 'Color & Add-Ons' };
    el.innerHTML = visibleSteps.map(s => {
      const text = generateStageSummary(s);
      return `<div class="review-summary-row">
        <div class="rsr-step">${s}</div>
        <span class="rsr-label">${labels[s]}</span>
        <span class="rsr-value">${escapeHtml(text || '—')}</span>
        <button class="rsr-edit" data-goto="${s}">Edit</button>
      </div>`;
    }).join('');
    // Wire rsr-edit buttons
    el.querySelectorAll('.rsr-edit[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.goto)));
    });
  }

  // Core: navigate to a specific step
  function goToStep(n) {
    state.currentStep = n;

    const visibleSteps = getVisibleSteps();

    [1, 2, 3, 4, 5].forEach(s => {
      const item = document.getElementById(`stage-item-${s}`);
      const body = document.getElementById(`stage-body-${s}`);
      const dot  = document.getElementById(`stage-dot-${s}`);
      const editBtn = document.getElementById(`stage-edit-${s}`);
      const summaryEl = document.getElementById(`stage-summary-${s}`);
      if (!item) return;

      // Stage 2 hidden for color-only mode
      if (s === 2 && !visibleSteps.includes(2)) {
        item.style.display = 'none';
        return;
      } else {
        item.style.display = '';
      }

      if (s < n) {
        // Completed
        item.className = 'stage-item completed';
        if (body) body.style.display = 'none';
        if (dot)  { dot.className = 'stage-dot completed'; dot.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17L4 12"/></svg>`; }
        if (editBtn) editBtn.style.display = '';
        if (summaryEl) summaryEl.textContent = generateStageSummary(s);
      } else if (s === n) {
        // Active
        item.className = 'stage-item active';
        if (body) body.style.display = '';
        if (dot)  { dot.className = 'stage-dot current'; dot.innerHTML = `<span>${s}</span>`; }
        if (editBtn) editBtn.style.display = 'none';
        if (summaryEl) summaryEl.textContent = '';
        // Render review summaries when entering step 5
        if (s === 5) renderReviewSummaries();
      } else {
        // Locked (future)
        item.className = 'stage-item locked';
        if (body) body.style.display = 'none';
        if (dot)  { dot.className = 'stage-dot locked'; dot.innerHTML = `<span>${s}</span>`; }
        if (editBtn) editBtn.style.display = 'none';
        if (summaryEl) summaryEl.textContent = '';
      }
    });

    // Show ticket sidebar only on step 5
    const sidebar = document.getElementById('desktop-ticket-container');
    const mainEl  = document.getElementById('atelier-main');
    const mobileBar = document.getElementById('mobile-sticky-bar');
    if (n === 5) {
      if (mainEl) mainEl.classList.add('stage-5-active');
      if (sidebar) sidebar.style.display = '';
      if (mobileBar) mobileBar.style.display = 'none';
      checkTicketMount();
    } else {
      if (mainEl) mainEl.classList.remove('stage-5-active');
      if (sidebar) sidebar.style.display = 'none';
      if (mobileBar) mobileBar.style.display = '';
    }

    renderFlowIndicator();
    updateSectionVisibility();

    // Scroll to top of first visible stage item
    const activeItem = document.getElementById(`stage-item-${n}`);
    if (activeItem) {
      setTimeout(() => {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  // Change mode and sync UI (stage 1 cards, header tabs, sections)
  function syncMode(newMode) {
    state.mode = newMode;

    // Sync header mode tabs
    modeTabs.forEach(t => t.classList.toggle('active', t.dataset.mode === newMode));

    // Sync service type cards in stage 1
    document.querySelectorAll('.stc-card').forEach(card => {
      card.classList.toggle('active', card.dataset.mode === newMode);
    });

    // If currently on step 2 and mode is now color-only, skip to step 3
    if (newMode === 'color' && state.currentStep === 2) {
      goToStep(3);
    } else {
      goToStep(state.currentStep);
    }

    updateTicketUI();
  }

  // Wire service type cards (Stage 1)
  document.querySelectorAll('.stc-card').forEach(card => {
    card.addEventListener('click', () => syncMode(card.dataset.mode));
  });

  if (clientNameInput) {
    clientNameInput.addEventListener('input', () => {
      state.clientName = clientNameInput.value;
    });
  }
  if (clientContactInput) {
    clientContactInput.addEventListener('input', () => {
      state.clientContact = clientContactInput.value;
    });
  }

  // Wire stage header clicks (for completed stages — re-open/edit)
  [1, 2, 3, 4, 5].forEach(s => {
    const header = document.getElementById(`stage-header-${s}`);
    const editBtn = document.getElementById(`stage-edit-${s}`);
    if (header) {
      header.addEventListener('click', () => {
        const item = document.getElementById(`stage-item-${s}`);
        if (item && item.classList.contains('completed')) goToStep(s);
      });
    }
    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToStep(parseInt(editBtn.dataset.goto));
      });
    }
  });

  // Wire Back / Continue stage nav buttons
  document.querySelectorAll('.btn-stage-next[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.dataset.next);
      // For color-only mode, skip step 2
      const visibleSteps = getVisibleSteps();
      const nextVisible = visibleSteps.find(s => s >= next);
      if (nextVisible) goToStep(nextVisible);
    });
  });

  document.querySelectorAll('.btn-stage-prev[data-prev]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.dataset.prev);
      // For color-only mode, skip step 2 going back
      const visibleSteps = getVisibleSteps();
      const prevVisible = [...visibleSteps].reverse().find(s => s <= prev);
      if (prevVisible) goToStep(prevVisible);
    });
  });

  // Initial Boot
  checkTicketMount();
  populateStandaloneServices();
  renderExtensionEntries();
  renderColorAddons();
  renderTreatments();
  renderAftercare();
  updateTicketUI();
  goToStep(1);

  // ============================================================
  // CATALOG PERSISTENCE HELPERS
  // ============================================================

  function flattenCatalog(brands) {
    const rows = [];
    (brands || []).forEach(brand => {
      (brand.types || []).forEach(type => {
        (type.lengths || []).forEach(l => {
          rows.push({
            rowId: brand.id + '__' + type.id + '__' + l.length,
            brandId: brand.id, brandName: brand.name, brandOrigin: brand.origin || '',
            typeId: type.id, typeName: type.name, method: type.method,
            length: l.length, price: l.price || 0, wholesale: l.wholesale || 0,
            grams: l.grams || 0, packUnit: l.packUnit || ''
          });
        });
      });
    });
    return rows;
  }

  function flatToNestedCatalog(flat) {
    const brandMap = new Map();
    (flat || []).forEach(row => {
      if (!brandMap.has(row.brandId)) {
        brandMap.set(row.brandId, { id: row.brandId, name: row.brandName, origin: row.brandOrigin || '', types: new Map() });
      }
      const brand = brandMap.get(row.brandId);
      if (!brand.types.has(row.typeId)) {
        brand.types.set(row.typeId, { id: row.typeId, name: row.typeName, method: row.method, lengths: [] });
      }
      brand.types.get(row.typeId).lengths.push({
        length: row.length, price: row.price, wholesale: row.wholesale, grams: row.grams, packUnit: row.packUnit
      });
    });
    return Array.from(brandMap.values()).map(b => ({ ...b, types: Array.from(b.types.values()) }));
  }

  function getHairCatalogFlat() {
    try {
      const s = localStorage.getItem('atelier_hair_catalog');
      if (s) return JSON.parse(s);
    } catch(e) {}
    return flattenCatalog(window.HAIR_BRANDS || []);
  }

  function saveHairCatalogFlat(flat) {
    localStorage.setItem('atelier_hair_catalog', JSON.stringify(flat));
  }

  function getHairCatalog() {
    return flatToNestedCatalog(getHairCatalogFlat());
  }

  function getStylingProducts() {
    try {
      const s = localStorage.getItem('atelier_styling_products');
      if (s) return JSON.parse(s);
    } catch(e) {}
    return (window.AFTERCARE_PRODUCTS || []).map(p => ({ ...p, active: p.active !== false }));
  }

  function saveStylingProducts(products) {
    localStorage.setItem('atelier_styling_products', JSON.stringify(products));
  }

  // Generic modal
  function showAdminModal(title, bodyHtml, onConfirm, confirmLabel) {
    let modal = document.getElementById('admin-crud-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'admin-crud-modal';
      modal.className = 'admin-modal-overlay';
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="admin-modal-box">
        <div class="admin-modal-header">
          <h4 class="admin-modal-title">${title}</h4>
          <button class="admin-modal-close" id="admin-modal-close-btn">✕</button>
        </div>
        <div class="admin-modal-body">${bodyHtml}</div>
        <div class="admin-modal-footer">
          <button class="admin-btn-ghost" id="admin-modal-cancel-btn">Cancel</button>
          <button class="admin-btn-primary" id="admin-modal-confirm-btn">${confirmLabel || 'Save'}</button>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
    modal.querySelector('#admin-modal-close-btn').addEventListener('click', () => { modal.style.display = 'none'; });
    modal.querySelector('#admin-modal-cancel-btn').addEventListener('click', () => { modal.style.display = 'none'; });
    modal.querySelector('#admin-modal-confirm-btn').addEventListener('click', () => {
      const result = onConfirm(modal);
      if (result !== false) modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    return modal;
  }

  // ============================================================
  // ADMIN PANEL
  // ============================================================
  const adminOverlay = document.getElementById('admin-panel-overlay');
  const btnOpenAdmin = document.getElementById('btn-open-admin');
  const btnCloseAdmin = document.getElementById('btn-close-admin');
  const adminNavTabs = document.querySelectorAll('.admin-nav-tab');
  const adminTabPanes = document.querySelectorAll('.admin-tab-pane');

  // Default team roster data
  const DEFAULT_TEAM = [
    { name: 'Salon Apple', role: 'Owner / Extensionist + Colorist', level: 10, email: 'fajardo80@gmail.com' },
    { name: 'Maria G.', role: 'Lead Extensionist', level: 7, email: 'maria@salon.com' },
    { name: 'Jade T.', role: 'Colorist', level: 5, email: 'jade@salon.com' }
  ];

  function openAdminPanel() {
    if (!adminOverlay) return;
    adminOverlay.classList.add('open');
    adminOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Populate dynamic content on open
    populateAdminTeam();
    populateServicePricingCats();
    renderHairPricingTable();
    renderStylingProductsTable();
    loadAdminScripts();
    wireHairPricingButtons();
    wireStylingProductsButtons();
  }

  function closeAdminPanel() {
    if (!adminOverlay) return;
    adminOverlay.classList.remove('open');
    adminOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnOpenAdmin) btnOpenAdmin.addEventListener('click', openAdminPanel);
  if (btnCloseAdmin) btnCloseAdmin.addEventListener('click', closeAdminPanel);

  // Tab switching
  adminNavTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      adminNavTabs.forEach(t => t.classList.remove('active'));
      adminTabPanes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const paneId = 'admin-tab-' + tab.dataset.adminTab;
      const pane = document.getElementById(paneId);
      if (pane) pane.classList.add('active');
    });
  });

  // ---- TEAM TAB ----
  function populateAdminTeam() {
    const grid = document.getElementById('team-roster-grid');
    if (!grid) return;
    const team = JSON.parse(localStorage.getItem('atelier_team') || 'null') || DEFAULT_TEAM;
    grid.innerHTML = '';
    team.forEach(member => {
      const initials = member.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      const card = document.createElement('div');
      card.className = 'admin-team-card';
      card.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <div class="admin-team-avatar">${initials}</div>
          <div>
            <div class="admin-team-name">${member.name}</div>
            <div class="admin-team-role">${member.role}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span class="admin-team-level">Level ${member.level}</span>
          <span style="font-size:0.72rem;color:var(--text-muted);">${member.email}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  const btnAddMember = document.getElementById('btn-add-member');
  const addMemberForm = document.getElementById('add-member-form');
  const btnSaveMember = document.getElementById('btn-save-member');
  const btnCancelMember = document.getElementById('btn-cancel-member');
  if (btnAddMember) btnAddMember.addEventListener('click', () => {
    addMemberForm.style.display = addMemberForm.style.display === 'none' ? 'block' : 'none';
  });
  if (btnCancelMember) btnCancelMember.addEventListener('click', () => {
    addMemberForm.style.display = 'none';
  });
  if (btnSaveMember) btnSaveMember.addEventListener('click', () => {
    showToast('Invite sent (team management coming soon).');
    addMemberForm.style.display = 'none';
  });

  // ---- SERVICE PRICING TAB — Editable Grid ----
  const ADMIN_SERVICE_SECTIONS = [
    { key: 'lightening', title: 'Lightening Services' },
    { key: 'color',      title: 'Color Services' },
    { key: 'addon',      title: 'Add-On Color' },
    { key: 'bowls',      title: 'Additional Bowls' },
    { key: 'keratin',    title: 'Keratin Treatments' },
    { key: 'treatments', title: 'Treatments' },
    { key: 'haircuts',   title: 'Haircuts' },
    { key: 'blowouts',   title: 'Blowouts' }
  ];

  function populateServicePricingCats() {
    const container = document.getElementById('admin-service-cats');
    if (!container) return;
    container.innerHTML = '';
    // Override grid style for full-width sections
    container.style.display = 'block';

    const stored = getStoredServicePricing();

    ADMIN_SERVICE_SECTIONS.forEach(section => {
      const services = (window.SERVICE_PRICING_DEFAULTS || {})[section.key] || [];
      if (!services.length) return;

      const wrap = document.createElement('div');
      wrap.className = 'admin-service-grid-section';

      // Section header
      const hdr = document.createElement('div');
      hdr.className = 'admin-service-grid-hdr';
      hdr.innerHTML = `
        <h4 class="admin-service-grid-title">${section.title}</h4>
        <button class="admin-btn-primary admin-save-section-btn" data-section="${section.key}" style="font-size:0.75rem;padding:0.4rem 0.9rem;">
          Save ${section.title}
        </button>
      `;
      wrap.appendChild(hdr);

      // Table
      const tableWrap = document.createElement('div');
      tableWrap.className = 'admin-table-wrap';
      tableWrap.style.marginBottom = '0';

      const table = document.createElement('table');
      table.className = 'admin-table admin-service-price-table';

      // Header
      const thead = document.createElement('thead');
      thead.innerHTML = `<tr>
        <th style="min-width:180px;">Service</th>
        ${[1,2,3,4,5,6,7,8,9,10].map(n => `<th class="admin-price-th">L${n}</th>`).join('')}
      </tr>`;
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      services.forEach(svc => {
        const activePrices = (stored[svc.id] && stored[svc.id].length === 10)
          ? stored[svc.id]
          : svc.prices;
        const tr = document.createElement('tr');
        tr.dataset.svcId = svc.id;
        tr.dataset.svcSection = section.key;
        tr.innerHTML = `
          <td class="admin-svc-name-cell">${svc.name}</td>
          ${activePrices.map((p, i) => `
            <td><input type="number" class="admin-price-input" data-level="${i}"
              value="${p}" min="0" max="9999" step="1"></td>
          `).join('')}
        `;
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      tableWrap.appendChild(table);
      wrap.appendChild(tableWrap);

      // Save feedback
      const statusEl = document.createElement('div');
      statusEl.className = 'admin-section-save-status';
      statusEl.dataset.statusFor = section.key;
      wrap.appendChild(statusEl);

      container.appendChild(wrap);
    });

    // Save All bar
    const saveAllBar = document.createElement('div');
    saveAllBar.className = 'admin-save-all-bar';
    saveAllBar.innerHTML = `
      <span style="font-size:0.82rem;color:var(--text-secondary);">Changes apply to the calculator immediately after saving.</span>
      <button class="admin-btn-primary" id="btn-save-all-pricing">Save All Pricing</button>
      <span class="admin-save-status" id="save-all-status"></span>
    `;
    container.appendChild(saveAllBar);

    // Attach save-section listeners
    container.querySelectorAll('.admin-save-section-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        saveSectionPricing(btn.dataset.section);
        const statusEl = container.querySelector(`[data-status-for="${btn.dataset.section}"]`);
        if (statusEl) {
          statusEl.textContent = '✓ Saved';
          setTimeout(() => { statusEl.textContent = ''; }, 2500);
        }
        showToast(`${btn.textContent.replace('Save ', '')} pricing saved.`);
        updateTicketUI(); // Recalculate with new prices
      });
    });

    // Save All
    const saveAllBtn = container.querySelector('#btn-save-all-pricing');
    if (saveAllBtn) {
      saveAllBtn.addEventListener('click', () => {
        ADMIN_SERVICE_SECTIONS.forEach(s => saveSectionPricing(s.key));
        const el = container.querySelector('#save-all-status');
        if (el) {
          el.textContent = '✓ All pricing saved';
          setTimeout(() => { el.textContent = ''; }, 3000);
        }
        showToast('All service pricing saved.');
        updateTicketUI();
      });
    }
  }

  function saveSectionPricing(sectionKey) {
    const stored = getStoredServicePricing();
    const rows = document.querySelectorAll(`tr[data-svc-section="${sectionKey}"]`);
    rows.forEach(row => {
      const id = row.dataset.svcId;
      const inputs = row.querySelectorAll('.admin-price-input');
      stored[id] = Array.from(inputs).map(inp => parseFloat(inp.value) || 0);
    });
    localStorage.setItem('atelier_service_pricing', JSON.stringify(stored));
  }

  // ---- HAIR PRICING TAB — CRUD ----
  const HAIR_METHOD_NAMES = { weft: 'Weft Extensions', 'tape-in': 'Tape-In', fusion: 'Fusion', topper: 'Topper' };

  function renderHairPricingTable() {
    const tbody = document.getElementById('hair-pricing-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const filterEl = document.getElementById('hair-method-filter');
    const filterVal = filterEl ? filterEl.value : '';
    const flat = getHairCatalogFlat();
    const visible = filterVal ? flat.filter(r => r.method === filterVal) : flat;

    visible.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${HAIR_METHOD_NAMES[row.method] || row.method}</td>
        <td><strong>${row.brandName}</strong></td>
        <td>${row.typeName}</td>
        <td>${row.length.replace(' inch', '″')}</td>
        <td><input type="number" class="admin-price-input hair-price-cell" data-row-id="${row.rowId}" data-field="price" value="${row.price}" min="0" step="0.5" style="width:70px;"></td>
        <td><input type="number" class="admin-price-input hair-price-cell" data-row-id="${row.rowId}" data-field="wholesale" value="${row.wholesale}" min="0" step="0.5" style="width:70px;"></td>
        <td>${row.grams ? row.grams + 'g' : '—'}</td>
        <td style="font-size:0.72rem;color:var(--text-secondary);">${row.packUnit || '—'}</td>
        <td>
          <button class="admin-table-btn hair-edit-btn" data-row-id="${row.rowId}" title="Edit all fields">✎</button>
          <button class="admin-table-btn hair-delete-btn" data-row-id="${row.rowId}" title="Delete" style="color:#ef4444;">✕</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Inline price/wholesale auto-save on change
    tbody.querySelectorAll('.hair-price-cell').forEach(inp => {
      inp.addEventListener('change', () => {
        const flat2 = getHairCatalogFlat();
        const entry = flat2.find(r => r.rowId === inp.dataset.rowId);
        if (entry) {
          entry[inp.dataset.field] = parseFloat(inp.value) || 0;
          saveHairCatalogFlat(flat2);
          updateTicketUI();
        }
      });
    });

    // Edit button → modal with all editable fields
    tbody.querySelectorAll('.hair-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const flat2 = getHairCatalogFlat();
        const row2 = flat2.find(r => r.rowId === btn.dataset.rowId);
        if (!row2) return;
        showAdminModal('Edit Hair Product', `
          <div class="admin-form-grid">
            <div class="admin-form-group"><label class="admin-label">Brand Name</label><input class="admin-input" id="he-brand" value="${row2.brandName}"></div>
            <div class="admin-form-group"><label class="admin-label">Type Name</label><input class="admin-input" id="he-type" value="${row2.typeName}"></div>
            <div class="admin-form-group"><label class="admin-label">Method</label>
              <select class="admin-select" id="he-method">
                ${['weft','tape-in','fusion','topper'].map(m=>`<option value="${m}"${row2.method===m?' selected':''}>${HAIR_METHOD_NAMES[m]||m}</option>`).join('')}
              </select>
            </div>
            <div class="admin-form-group"><label class="admin-label">Length</label><input class="admin-input" id="he-length" value="${row2.length}" placeholder="22 inch"></div>
            <div class="admin-form-group"><label class="admin-label">Retail Price ($)</label><input class="admin-input" id="he-price" type="number" value="${row2.price}"></div>
            <div class="admin-form-group"><label class="admin-label">Wholesale ($)</label><input class="admin-input" id="he-wholesale" type="number" value="${row2.wholesale}"></div>
            <div class="admin-form-group"><label class="admin-label">Grams</label><input class="admin-input" id="he-grams" type="number" value="${row2.grams}"></div>
            <div class="admin-form-group"><label class="admin-label">Pack Unit</label><input class="admin-input" id="he-packunit" value="${row2.packUnit}"></div>
          </div>
        `, () => {
          row2.brandName = document.getElementById('he-brand').value.trim() || row2.brandName;
          row2.typeName  = document.getElementById('he-type').value.trim()  || row2.typeName;
          row2.method    = document.getElementById('he-method').value;
          row2.length    = document.getElementById('he-length').value.trim() || row2.length;
          row2.price     = parseFloat(document.getElementById('he-price').value) || 0;
          row2.wholesale = parseFloat(document.getElementById('he-wholesale').value) || 0;
          row2.grams     = parseInt(document.getElementById('he-grams').value) || 0;
          row2.packUnit  = document.getElementById('he-packunit').value.trim();
          // Re-generate rowId in case length/brand/type changed
          row2.rowId     = row2.brandId + '__' + row2.typeId + '__' + row2.length;
          saveHairCatalogFlat(flat2);
          renderHairPricingTable();
          updateTicketUI();
          showToast('Product updated.');
        }, 'Save Changes');
      });
    });

    // Delete button → confirm → remove
    tbody.querySelectorAll('.hair-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('Delete this product entry? This cannot be undone.')) return;
        const flat2 = getHairCatalogFlat().filter(r => r.rowId !== btn.dataset.rowId);
        saveHairCatalogFlat(flat2);
        renderHairPricingTable();
        updateTicketUI();
        showToast('Product deleted.');
      });
    });
  }

  // Method filter
  const hairMethodFilter = document.getElementById('hair-method-filter');
  if (hairMethodFilter) {
    hairMethodFilter.addEventListener('change', renderHairPricingTable);
  }

  // Markup apply
  const btnApplyMarkup = document.getElementById('btn-apply-markup');
  if (btnApplyMarkup) {
    btnApplyMarkup.addEventListener('click', () => {
      const ratio = parseFloat(document.getElementById('markup-select').value);
      if (!ratio) { showToast('Select a markup ratio first.'); return; }
      const filterVal = document.getElementById('hair-method-filter').value;
      const flat = getHairCatalogFlat();
      let changed = 0;
      flat.forEach(row => {
        if (filterVal && row.method !== filterVal) return;
        if (row.wholesale > 0) { row.price = Math.round(row.wholesale * ratio * 100) / 100; changed++; }
      });
      saveHairCatalogFlat(flat);
      renderHairPricingTable();
      updateTicketUI();
      showToast(`Markup applied to ${changed} product${changed !== 1 ? 's' : ''}.`);
    });
  }

  // Export JSON
  const btnExportHair = document.querySelector('#admin-tab-hair-pricing .admin-btn-ghost:first-of-type');
  // (wired dynamically via data attribute below)
  document.addEventListener('click', (e) => {
    if (e.target.dataset.hairAction === 'export') {
      const json = JSON.stringify(getHairCatalogFlat(), null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'hair-catalog.json'; a.click();
      URL.revokeObjectURL(url);
    }
    if (e.target.dataset.hairAction === 'import') {
      document.getElementById('hair-import-input').click();
    }
    if (e.target.dataset.hairAction === 'add') {
      showAdminModal('Add Hair Product', `
        <div class="admin-form-grid">
          <div class="admin-form-group"><label class="admin-label">Brand Name</label><input class="admin-input" id="ha-brand" placeholder="e.g. Bellami Professional"></div>
          <div class="admin-form-group"><label class="admin-label">Type Name</label><input class="admin-input" id="ha-type" placeholder="e.g. Hand-Tied Weft"></div>
          <div class="admin-form-group"><label class="admin-label">Method</label>
            <select class="admin-select" id="ha-method">
              ${['weft','tape-in','fusion','topper'].map(m=>`<option value="${m}">${HAIR_METHOD_NAMES[m]||m}</option>`).join('')}
            </select>
          </div>
          <div class="admin-form-group"><label class="admin-label">Length</label><input class="admin-input" id="ha-length" placeholder="22 inch"></div>
          <div class="admin-form-group"><label class="admin-label">Retail Price ($)</label><input class="admin-input" id="ha-price" type="number" placeholder="0"></div>
          <div class="admin-form-group"><label class="admin-label">Wholesale ($)</label><input class="admin-input" id="ha-wholesale" type="number" placeholder="0"></div>
          <div class="admin-form-group"><label class="admin-label">Grams</label><input class="admin-input" id="ha-grams" type="number" placeholder="60"></div>
          <div class="admin-form-group"><label class="admin-label">Pack Unit</label><input class="admin-input" id="ha-packunit" placeholder="65g pack"></div>
        </div>
      `, () => {
        const brandName = document.getElementById('ha-brand').value.trim();
        const typeName  = document.getElementById('ha-type').value.trim();
        const length    = document.getElementById('ha-length').value.trim();
        if (!brandName || !typeName || !length) { showToast('Brand, Type, and Length are required.'); return false; }
        const method    = document.getElementById('ha-method').value;
        const brandId   = brandName.toLowerCase().replace(/\s+/g, '-');
        const typeId    = brandId + '-' + typeName.toLowerCase().replace(/\s+/g, '-');
        const price     = parseFloat(document.getElementById('ha-price').value) || 0;
        const wholesale = parseFloat(document.getElementById('ha-wholesale').value) || 0;
        const grams     = parseInt(document.getElementById('ha-grams').value) || 0;
        const packUnit  = document.getElementById('ha-packunit').value.trim();
        const flat = getHairCatalogFlat();
        flat.push({ rowId: brandId+'__'+typeId+'__'+length, brandId, brandName, brandOrigin: '', typeId, typeName, method, length, price, wholesale, grams, packUnit });
        saveHairCatalogFlat(flat);
        renderHairPricingTable();
        updateTicketUI();
        showToast('Product added.');
      }, 'Add Product');
    }
  });

  // Wire export/import/add buttons in hair pricing header via data attributes
  // (inject after the tab renders — done on openAdminPanel)
  function wireHairPricingButtons() {
    const tab = document.getElementById('admin-tab-hair-pricing');
    if (!tab) return;
    const btns = tab.querySelectorAll('.admin-section-header .admin-btn-ghost, .admin-section-header .admin-btn-primary');
    if (btns.length >= 3) {
      btns[0].dataset.hairAction = 'export';
      btns[1].dataset.hairAction = 'import';
      btns[2].dataset.hairAction = 'add';
    }
    // Hidden file input for import
    if (!document.getElementById('hair-import-input')) {
      const inp = document.createElement('input');
      inp.type = 'file'; inp.accept = '.json'; inp.id = 'hair-import-input'; inp.style.display = 'none';
      document.body.appendChild(inp);
      inp.addEventListener('change', (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const data = JSON.parse(ev.target.result);
            if (Array.isArray(data)) {
              saveHairCatalogFlat(data);
              renderHairPricingTable();
              updateTicketUI();
              showToast('Hair catalog imported successfully.');
            } else { showToast('Invalid format — expected a JSON array.'); }
          } catch(err) { showToast('Failed to parse JSON file.'); }
        };
        reader.readAsText(file);
        inp.value = '';
      });
    }
  }

  // ---- STYLING PRODUCTS TAB — CRUD ----
  function renderStylingProductsTable() {
    const tbody = document.getElementById('styling-products-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const searchVal = (document.getElementById('styling-search') || {}).value || '';
    const products = getStylingProducts();

    products.forEach((prod, idx) => {
      if (searchVal && !`${prod.name} ${prod.id} ${prod.description || ''}`.toLowerCase().includes(searchVal.toLowerCase())) return;
      const tr = document.createElement('tr');
      const isActive = prod.active !== false;
      tr.innerHTML = `
        <td><input class="admin-price-input sp-field" data-idx="${idx}" data-field="id" value="${prod.id || ''}" style="width:90px;font-size:0.7rem;"></td>
        <td><input class="admin-price-input sp-field" data-idx="${idx}" data-field="name" value="${prod.name || ''}" style="width:140px;"></td>
        <td><input class="admin-price-input sp-field" data-idx="${idx}" data-field="description" value="${(prod.description||'').replace(/"/g,'&quot;')}" style="width:180px;font-size:0.72rem;"></td>
        <td><input type="number" class="admin-price-input sp-field" data-idx="${idx}" data-field="price" value="${prod.price || 0}" style="width:65px;"></td>
        <td><input type="number" class="admin-price-input sp-field" data-idx="${idx}" data-field="wholesale" value="${prod.wholesale || 0}" style="width:65px;"></td>
        <td>
          <label class="admin-switch" style="transform:scale(0.85);transform-origin:left center;">
            <input type="checkbox" class="sp-active-toggle" data-idx="${idx}" ${isActive ? 'checked' : ''}>
            <span class="admin-switch-slider"></span>
          </label>
        </td>
        <td>
          <button class="admin-table-btn sp-delete-btn" data-idx="${idx}" title="Delete" style="color:#ef4444;">✕</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Auto-save field changes on blur
    tbody.querySelectorAll('.sp-field').forEach(inp => {
      inp.addEventListener('change', () => {
        const prods = getStylingProducts();
        const idx = parseInt(inp.dataset.idx);
        if (!prods[idx]) return;
        const field = inp.dataset.field;
        prods[idx][field] = (field === 'price' || field === 'wholesale') ? (parseFloat(inp.value) || 0) : inp.value;
        saveStylingProducts(prods);
        renderAftercare();
        updateTicketUI();
      });
    });

    // Active toggle
    tbody.querySelectorAll('.sp-active-toggle').forEach(inp => {
      inp.addEventListener('change', () => {
        const prods = getStylingProducts();
        const idx = parseInt(inp.dataset.idx);
        if (!prods[idx]) return;
        prods[idx].active = inp.checked;
        // If deactivated, remove from aftercare selection
        if (!inp.checked) state.selectedAftercare.delete(prods[idx].id);
        saveStylingProducts(prods);
        renderAftercare();
        updateTicketUI();
        showToast(inp.checked ? `${prods[idx].name} activated.` : `${prods[idx].name} hidden from calculator.`);
      });
    });

    // Delete
    tbody.querySelectorAll('.sp-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const prods = getStylingProducts();
        const idx = parseInt(btn.dataset.idx);
        const prod = prods[idx];
        if (!prod) return;
        if (!confirm(`Delete "${prod.name}"? This removes it from the aftercare section.`)) return;
        state.selectedAftercare.delete(prod.id);
        prods.splice(idx, 1);
        saveStylingProducts(prods);
        renderStylingProductsTable();
        renderAftercare();
        updateTicketUI();
        showToast('Product deleted.');
      });
    });
  }

  // Styling products live search
  const stylingSearch = document.getElementById('styling-search');
  if (stylingSearch) {
    stylingSearch.addEventListener('input', renderStylingProductsTable);
  }

  // Add styling product button
  document.addEventListener('click', (e) => {
    if (e.target.dataset.spAction === 'add') {
      showAdminModal('Add Aftercare / Styling Product', `
        <div class="admin-form-grid">
          <div class="admin-form-group"><label class="admin-label">ID (unique slug)</label><input class="admin-input" id="sp-id" placeholder="e.g. new-serum"></div>
          <div class="admin-form-group"><label class="admin-label">Name</label><input class="admin-input" id="sp-name" placeholder="Product name"></div>
          <div class="admin-form-group"><label class="admin-label">Retail Price ($)</label><input class="admin-input" id="sp-price" type="number" placeholder="0"></div>
          <div class="admin-form-group"><label class="admin-label">Wholesale ($)</label><input class="admin-input" id="sp-wholesale" type="number" placeholder="0"></div>
          <div class="admin-form-group" style="grid-column:span 2"><label class="admin-label">Description</label><input class="admin-input" id="sp-desc" placeholder="Brief product description"></div>
        </div>
      `, () => {
        const id = document.getElementById('sp-id').value.trim();
        const name = document.getElementById('sp-name').value.trim();
        if (!id || !name) { showToast('ID and Name are required.'); return false; }
        const prods = getStylingProducts();
        if (prods.find(p => p.id === id)) { showToast('A product with this ID already exists.'); return false; }
        prods.push({
          id, name, active: true, popular: false,
          price: parseFloat(document.getElementById('sp-price').value) || 0,
          wholesale: parseFloat(document.getElementById('sp-wholesale').value) || 0,
          description: document.getElementById('sp-desc').value.trim()
        });
        saveStylingProducts(prods);
        renderStylingProductsTable();
        renderAftercare();
        showToast('Product added.');
      }, 'Add Product');
    }
  });

  // Wire Add button in styling products header
  function wireStylingProductsButtons() {
    const tab = document.getElementById('admin-tab-styling-products');
    if (!tab) return;
    const addBtn = tab.querySelector('.admin-section-header .admin-btn-primary');
    if (addBtn) addBtn.dataset.spAction = 'add';
  }

  // ---- SCRIPTS TAB ----
  const DEFAULT_SCRIPT = 'Welcome! Today we\'ll walk through your extension and color options together. I\'ll guide you through method selection, hair specifications, and color formulation — and at the end you\'ll receive a detailed investment quote. Let\'s get started!';

  function loadAdminScripts() {
    const welcomeEl = document.getElementById('script-welcome');
    const extEl = document.getElementById('script-extensions');
    if (welcomeEl && !welcomeEl._loaded) {
      welcomeEl.value = localStorage.getItem('atelier_script_welcome') || DEFAULT_SCRIPT;
      welcomeEl._loaded = true;
    }
    if (extEl && !extEl._loaded) {
      extEl.value = localStorage.getItem('atelier_script_extensions') || '';
      extEl._loaded = true;
    }
  }

  const btnSaveScript = document.getElementById('btn-save-script');
  const btnResetScript = document.getElementById('btn-reset-script');
  const scriptSaveStatus = document.getElementById('script-save-status');
  if (btnSaveScript) {
    btnSaveScript.addEventListener('click', () => {
      const val = document.getElementById('script-welcome').value;
      localStorage.setItem('atelier_script_welcome', val);
      if (scriptSaveStatus) {
        scriptSaveStatus.textContent = '✓ Saved';
        setTimeout(() => { scriptSaveStatus.textContent = ''; }, 2500);
      }
    });
  }
  if (btnResetScript) {
    btnResetScript.addEventListener('click', () => {
      const el = document.getElementById('script-welcome');
      if (el) el.value = DEFAULT_SCRIPT;
      localStorage.removeItem('atelier_script_welcome');
      if (scriptSaveStatus) {
        scriptSaveStatus.textContent = '✓ Reset to default';
        setTimeout(() => { scriptSaveStatus.textContent = ''; }, 2500);
      }
    });
  }
  const btnSaveExtScript = document.getElementById('btn-save-ext-script');
  const extScriptStatus = document.getElementById('ext-script-save-status');
  if (btnSaveExtScript) {
    btnSaveExtScript.addEventListener('click', () => {
      const val = document.getElementById('script-extensions').value;
      localStorage.setItem('atelier_script_extensions', val);
      if (extScriptStatus) {
        extScriptStatus.textContent = '✓ Saved';
        setTimeout(() => { extScriptStatus.textContent = ''; }, 2500);
      }
    });
  }

  // ---- SETTINGS ----
  const btnSaveSalonInfo = document.getElementById('btn-save-salon-info');
  if (btnSaveSalonInfo) {
    btnSaveSalonInfo.addEventListener('click', () => {
      const nameEl = document.getElementById('setting-salon-name');
      if (nameEl) {
        const name = nameEl.value.trim() || 'Salon Apple';
        document.getElementById('admin-salon-name').textContent = name;
        document.querySelector('.greeting-name').textContent = name;
        localStorage.setItem('atelier_salon_name', name);
        showToast('Salon info saved.');
      }
    });
  }
  // Restore salon name on load
  const savedSalonName = localStorage.getItem('atelier_salon_name');
  if (savedSalonName) {
    const greetingName = document.querySelector('.greeting-name');
    const adminSalonName = document.getElementById('admin-salon-name');
    const settingInput = document.getElementById('setting-salon-name');
    if (greetingName) greetingName.textContent = savedSalonName;
    if (adminSalonName) adminSalonName.textContent = savedSalonName;
    if (settingInput) settingInput.value = savedSalonName;
  }
});
