
import { Treatment } from '../types';

export const TREATMENTS: Treatment[] = [
  // Signature Method
  {
    id: 'soph-1',
    title: 'The Body by Soph Method®',
    category: 'Signature Method',
    image: 'https://www.relaxdayspa.com.au/wp-content/uploads/2025/07/Full-Body-Massage-near-me-in-Melbourne-CBD.webp',
    price: '£140',
    duration: '60 MIN',
    isPremium: true,
    description: 'The Body by Soph Method® is a deeply restorative lymphatic drainage massage designed to support the nervous system, encourage gentle detoxification, and reconnect you back into your body. This treatment uses soft, rhythmic touch combined with guided deep breathing and intentional breathwork. The gentle pressure signals safety to the nervous system, helping the body move out of fight or flight and into rest and repair. By calming the nervous system, lymphatic flow is supported, inflammation can reduce, digestion may improve, and the body is given space to rebalance itself naturally. A key part of the Body by Soph Method® is emotional release. During the treatment, you are gently guided to focus on something you are ready to let go of, supporting the release of emotional weight the body has been carrying. The treatment finishes by reconnecting you back into your body with gratitude, helping rebuild trust between the mind and body. The Body by Soph Method® is not just a massage. It is a reset for the nervous system, the lymphatic system, and the emotional body.',
    expectations: [
      'Nervous System Reset: Soft, rhythmic touch and guided breathwork to calm the nervous system, moving the body out of fight or flight and into rest and repair.',
      'Emotional Release: You are gently guided to focus on something you are ready to let go of, supporting the release of emotional weight the body has been carrying.',
      'Lymphatic Flow: Gentle support to encourage detoxification, reduce inflammation, improve digestion, and allow the body to rebalance naturally.',
      'Reconnection: The treatment finishes by reconnecting you back into your body with gratitude, helping rebuild trust between the mind and body.'
    ],
    eligibility: 'This treatment is not suitable for those with active infections, acute inflammation, or certain cardiovascular conditions. Please consult with your practitioner if you have any health concerns.'
  },
  {
    id: 'soph-2',
    title: 'Massage + Advanced Body Contouring',
    category: 'Signature Method',
    image: 'https://medimoi.co.uk/assets/cta-wellness-CWcd5w1C.jpg',
    price: '£200',
    duration: '90 MIN',
    isPremium: true,
    description: 'The Body by Soph Method® with Fat Melt and Skin Tightening is a deeply restorative, whole-body treatment designed to reset the nervous system, support lymphatic flow, and enhance natural body sculpting results. This treatment always begins with full-body lymphatic drainage. The priority is calming the body and moving it into a rest and repair state, where healing, detoxification, digestion and fat metabolism can work efficiently. When the nervous system is regulated, the body responds better to all sculpting technologies. Once lymphatic flow is activated and congestion is reduced, advanced body contouring can be added where required, based on the client\'s goals.',
    expectations: [
      'Cavitation Fat Melt: Low-frequency ultrasound waves target stubborn fat cells, creating vibrations that break down fat cell membranes, allowing the fat to be released as waste. The body then processes and eliminates this through the lymphatic system.',
      'Radio Frequency Skin Tightening: Gently heats the deeper layers of the skin to stimulate collagen and elastin production, improving skin firmness, elasticity and texture, creating a smoother, tighter appearance while supporting long-term skin health.',
      'Soft Sculpting & Digestive Work: Refining techniques to shape the body and encourage further lymphatic movement, followed by gentle abdominal and digestive work to support gut motility, reduce bloating, and encourage optimal digestion.'
    ],
    contraindications: [
      'Are pregnant or breastfeeding',
      'Have a pacemaker or any implanted electronic device',
      'Have metal implants in the treatment area',
      'Have heart conditions or severe cardiovascular disease',
      'Have epilepsy',
      'Have cancer or are undergoing cancer treatment',
      'Have liver or kidney disease, as fat is processed through these organs',
      'Have active infections, fever, or inflammatory skin conditions in the treatment area',
      'Have thrombosis, blood clots, or clotting disorders',
      'Have uncontrolled diabetes',
      'Have autoimmune conditions in an active flare',
      'Have open wounds, recent surgery, or scar tissue that has not fully healed in the treatment area'
    ]
  },
  // Body Treatments
  {
    id: 'body-1',
    title: 'Lymphatic Massage',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'A gentle massage that supports detox, reduces inflammation, and supports digestion.'
  },
  {
    id: 'body-2',
    title: 'Brazilian Lymphatic Drainage',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'A sculpting lymphatic massage designed to reduce water retention and contour.'
  },
  {
    id: 'body-3',
    title: 'Wood Therapy',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Using wooden tools to stimulate lymphatic flow and improve body shape.'
  },
  {
    id: 'body-4',
    title: 'Nutritionist',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: 'SESSION BASED',
    description: 'Personalised guidance to support energy, hormones, and overall wellbeing.'
  },
  {
    id: 'body-5',
    title: 'Acupuncturist',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Restoring balance and reducing pain through traditional needle therapy.'
  },
  {
    id: 'body-6',
    title: 'Cupping',
    category: 'Body Treatments',
    image: 'https://www.schoolofnaturaltherapies.co.uk/wp-content/uploads/2025/12/cupping-therapy-why-every-massage-therapist-should-add-this-ancient-technique-to-their-toolkit-1024x538.png',
    price: 'From £60',
    duration: '45-60 MIN',
    description: 'Suction therapy to release muscle tension and improve circulation.'
  },
  {
    id: 'body-7',
    title: 'Sports Massage',
    category: 'Body Treatments',
    image: 'https://rptutah.com/wp-content/uploads/2024/09/what-is-sports-massage-therapy-and-how-can-it-benefit-athletes-featured.jpg',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Relieving tight muscles and improving performance for active individuals.'
  },
  {
    id: 'body-8',
    title: 'Osteopath',
    category: 'Body Treatments',
    image: 'https://www.bodyandmind.clinic/wp-content/uploads/2020/11/osteopath-massage-stretching.jpg',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Hands-on treatment improving mobility and total body alignment.'
  },
  {
    id: 'body-9',
    title: 'Postpartum Massage',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Supporting physical recovery and reconnection after birth.'
  },
  {
    id: 'body-10',
    title: 'Physiotherapist',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Movement-based therapy to restore function and strength.'
  },
  {
    id: 'body-11',
    title: 'Aromatherapy',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Using essential oils to lift mood and promote deep relaxation.'
  },
  // Energy & Mind
  {
    id: 'energy-1',
    title: 'Reiki Healer',
    category: 'Energy & Mind',
    image: 'https://spanaturalcenter.com/wp-content/uploads/2024/11/actividad-wellness-meditacion-mujer.png',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Healing that helps release emotional blocks and restore balance.'
  },
  {
    id: 'mind-1',
    title: 'Hypnotherapist',
    category: 'Energy & Mind',
    image: 'https://ebv2e3r5onu.exactdn.com/wp-content/uploads/2022/02/shutterstock_1705371610-1024x683.jpg?strip=all',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Guided hypnosis to shift limiting beliefs and support change.'
  },
  {
    id: 'mind-2',
    title: 'Life Coach',
    category: 'Energy & Mind',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Supportive coaching to gain clarity and confidence.'
  },
  {
    id: 'mind-3',
    title: 'Somatic Therapist',
    category: 'Energy & Mind',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: '60 MIN',
    description: 'Body-based therapy helping to release stored stress.'
  },
  {
    id: 'mind-4',
    title: 'Menopause Coach',
    category: 'Energy & Mind',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    price: 'From £60',
    duration: 'SESSION BASED',
    description: '1:1 support through hormone balance and lifestyle optimisation.'
  },
  // Luxury Beauty
  {
    id: 'beauty-1',
    title: 'Luxury Sculpt & Lymphatic Facial',
    category: 'Luxury Beauty',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    price: 'From £80',
    duration: 'SESSION BASED',
    description: 'High-end facial experience designed to lift, sculpt, and detox.'
  }
];
