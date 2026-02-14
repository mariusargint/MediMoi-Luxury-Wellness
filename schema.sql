
-- Transactions Table: Tracking revenue and commission
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    total_amount NUMERIC NOT NULL,
    deposit_amount NUMERIC NOT NULL, -- The 20% platform fee
    platform_fee_percent NUMERIC DEFAULT 20,
    status TEXT CHECK (status IN ('pending', 'completed', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documents Table: Tracking partner compliance
CREATE TABLE IF NOT EXISTS verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES profiles(id),
    file_url TEXT NOT NULL,
    doc_type TEXT CHECK (doc_type IN ('insurance', 'certification')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    notes TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Operating Hours (if using a separate table instead of JSONB)
CREATE TABLE IF NOT EXISTS operating_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES profiles(id),
    day_of_week INT, -- 0-6
    open_time TIME,
    close_time TIME,
    is_closed BOOLEAN DEFAULT false
);

-- RLS Policies
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;

-- Partners can only see their own documents
CREATE POLICY "Partners can view own docs" 
ON verification_documents FOR SELECT 
USING (auth.uid() = partner_id);

-- Admins can see everything
CREATE POLICY "Admins can view everything" 
ON verification_documents FOR ALL 
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
