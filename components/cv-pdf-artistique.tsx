'use client';

import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';


interface Language {
  language: string;
  level: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
  startDate: string;
  endDate: string;
  highlights?: string[];
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface VolunteerWork {
  organization: string;
  role: string;
  period: string;
  description: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthDate?: string;
  drivingLicense?: string;
  image?: string;
}

interface DefaultData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: {
    technical: string[];
    soft: string[];
  };
  languages: Language[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  volunteerWork: VolunteerWork[];
  hobbies: Array<{
    category: string;
    description: string;
  }>;
}

interface CVPDFProps {
  data: any;
}

const sectionTitles = {
  fr: {
    experiences: 'EXPÉRIENCES',
    education: 'FORMATIONS',
    skills: 'COMPÉTENCES',
    languages: 'LANGUES',
    interests: 'INTÉRÊTS',
    certifications: 'CERTIFICATIONS',
    volunteer: 'BÉNÉVOLAT'
  },
  en: {
    experiences: 'EXPERIENCE',
    education: 'EDUCATION',
    skills: 'SKILLS',
    languages: 'LANGUAGES',
    interests: 'INTERESTS',
    certifications: 'CERTIFICATIONS',
    volunteer: 'VOLUNTEER WORK'
  },
  es: {
    experiences: 'EXPERIENCIA',
    education: 'EDUCACIÓN',
    skills: 'HABILIDADES',
    languages: 'IDIOMAS',
    interests: 'INTERESES',
    certifications: 'CERTIFICACIONES',
    volunteer: 'VOLUNTARIADO'
  }
};

const CVPDFArtistique: React.FC<CVPDFProps> = ({ data }) => {
  // Valeurs par défaut pour les champs manquants
  const defaultData: DefaultData = {
    personalInfo: {
      name: data.personalInfo?.name || "John Doe",
      title: data.personalInfo?.title || "Développeur Full Stack",
      email: data.personalInfo?.email || "john@doe.com",
      phone: data.personalInfo?.phone || "+33 6 00 00 00 00",
      location: data.personalInfo?.location || "Paris, France",
      birthDate: data.personalInfo?.birthDate || "01/01/1990",
      drivingLicense: data.personalInfo?.drivingLicense || "Permis B",
      linkedin: data.personalInfo?.linkedin || "linkedin.com/in/johndoe",
      github: data.personalInfo?.github || "github.com/johndoe"
    },
    professionalSummary: data.professionalSummary || "Développeur Full Stack passionné avec plus de 5 ans d'expérience...",
    experience: data.experience || [],
    education: data.education || [],
    skills: {
      technical: data.skills?.technical || [],
      soft: data.skills?.soft || []
    },
    languages: data.languages || [],
    certifications: data.certifications || [],
    volunteerWork: data.volunteerWork || [],
    hobbies: data.hobbies || [{ category: "Later", description: "Later" }]
  };

  const titles = sectionTitles[data.language as keyof typeof sectionTitles] || sectionTitles.fr;

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#F9F5EC',
      padding: '40 50',
      fontFamily: 'Helvetica',
      position: 'relative',
    },
    header: {
      flexDirection: 'row',
      marginBottom: 25,
      alignItems: 'center',
      position: 'relative',
    },
    profileImageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      overflow: 'hidden',
      marginRight: 20,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    headerRight: {
      flex: 1,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 4,
      fontFamily: 'Helvetica-Bold',
    },
    title: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    contactInfo: {
      fontSize: 10,
      color: '#444',
      marginBottom: 2,
    },
    mainContent: {
      flexDirection: 'row',
      flex: 1,
      position: 'relative',
    },
    columnDivider: {
      position: 'absolute',
      width: 1,
      top: 0,
      bottom: 0,
      left: '70%',
      backgroundColor: '#E0E0E0',
    },
    leftColumn: {
      width: '70%',
      paddingRight: 20,
    },
    rightColumn: {
      width: '30%',
      paddingLeft: 20,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 15,
      textTransform: 'uppercase',
      fontFamily: 'Helvetica-Bold',
      flexDirection: 'row',
      alignItems: 'center',
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sectionIcon: {
      width: 12,
      height: 12,
      marginLeft: 5,
      
    },

    sectionIconMain: {
      width: 15,
      height: 15,
      marginLeft: 5,
    },

    experienceItem: {
      marginBottom: 15,
    },
    experienceTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 2,
      fontFamily: 'Helvetica-Bold',
    },
    experienceCompany: {
      fontSize: 11,
      color: '#666',
      marginBottom: 2,
    },
    experienceDate: {
      fontSize: 10,
      color: '#888',
      marginBottom: 4,
    },
    experienceDescription: {
      fontSize: 10,
      color: '#444',
      lineHeight: 1.4,
      textAlign: 'justify',
    },
    skillItem: {
      fontSize: 10,
      color: '#444',
      marginBottom: 6,
    },
    languageItem: {
      fontSize: 10,
      color: '#444',
      marginBottom: 6,
    },
    interestItem: {
      fontSize: 10,
      color: '#444',
      marginBottom: 6,
    },
    quote: {
      fontSize: 10,
      fontStyle: 'italic',
      color: '#666',
      marginBottom: 20,
      padding: '10 15',
      borderLeft: '3 solid #FF6B6B',
      textAlign: 'justify',
    
    },
    decorativeShape1: {
      position: 'absolute',
      top: 20,
      right: 20,
      width: 40,
      height: 40,
      backgroundColor: '#4A90E2',
      borderRadius: 20,
      opacity: 0.3,
    },
    decorativeShape2: {
      position: 'absolute',
      top: 40,
      right: 50,
      width: 30,
      height: 30,
      backgroundColor: '#50E3C2',
      transform: 'rotate(45deg)',
      opacity: 0.2,
    },
    decorativeShape3: {
      position: 'absolute',
      bottom: 60,
      left: 40,
      width: 25,
      height: 25,
      backgroundColor: '#F8C51D',
      borderRadius: 5,
      opacity: 0.2,
    },
    decorativeShape4: {
      position: 'absolute',
      top: 150,
      left: 30,
      width: 35,
      height: 35,
      backgroundColor: '#8E44AD',
      transform: 'rotate(30deg)',
      opacity: 0.15,
    },
    decorativeShape5: {
      position: 'absolute',
      bottom: 120,
      right: 60,
      width: 45,
      height: 45,
      backgroundColor: '#FF6B6B',
      borderRadius: 10,
      transform: 'rotate(15deg)',
      opacity: 0.2,
    },
    decorativeShape6: {
      position: 'absolute',
      top: 280,
      right: 40,
      width: 20,
      height: 20,
      backgroundColor: '#4A90E2',
      borderRadius: 4,
      opacity: 0.25,
    },
    decorativeShape7: {
      position: 'absolute',
      top: 350,
      left: 50,
      width: 15,
      height: 15,
      backgroundColor: '#50E3C2',
      transform: 'rotate(60deg)',
      opacity: 0.2,
    },
    decorativeDot1: {
      position: 'absolute',
      top: 200,
      right: 80,
      width: 8,
      height: 8,
      backgroundColor: '#F8C51D',
      borderRadius: 4,
      opacity: 0.3,
    },
    decorativeDot2: {
      position: 'absolute',
      bottom: 180,
      left: 70,
      width: 6,
      height: 6,
      backgroundColor: '#8E44AD',
      borderRadius: 3,
      opacity: 0.25,
    },
    sectionDivider: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginVertical: 15,
    },
    artContainer: {
      marginTop: 30,
      position: 'relative',
      height: 200,
    },
    artCircle1: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#F28B25',
      opacity: 0.7,
      top: 0,
      left: 20,
    },
    artCircle2: {
      position: 'absolute',
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#1E88E5',
      opacity: 0.6,
      top: 40,
      left: 70,
    },
    artSquare1: {
      position: 'absolute',
      width: 50,
      height: 50,
      backgroundColor: '#2E7D32',
      opacity: 0.5,
      transform: 'rotate(45deg)',
      top: 80,
      left: 30,
    },
    artTriangle: {
      position: 'absolute',
      width: 0,
      height: 0,
      borderLeftWidth: 30,
      borderLeftColor: 'transparent',
      borderRightWidth: 30,
      borderRightColor: 'transparent',
      borderBottomWidth: 60,
      borderBottomColor: '#F28B25',
      opacity: 0.4,
      top: 20,
      right: 20,
    },
    artRect1: {
      position: 'absolute',
      width: 80,
      height: 20,
      backgroundColor: '#1E88E5',
      opacity: 0.5,
      transform: 'rotate(-30deg)',
      top: 100,
      right: 40,
    },
    artRect2: {
      position: 'absolute',
      width: 60,
      height: 15,
      backgroundColor: '#2E7D32',
      opacity: 0.6,
      transform: 'rotate(15deg)',
      top: 140,
      right: 20,
    },
    artDot1: {
      position: 'absolute',
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#F28B25',
      opacity: 0.8,
      top: 160,
      left: 50,
    },
    artDot2: {
      position: 'absolute',
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#1E88E5',
      opacity: 0.8,
      top: 180,
      left: 80,
    },
    artDot3: {
      position: 'absolute',
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#2E7D32',
      opacity: 0.8,
      top: 170,
      right: 60,
    },
    fullArtContainer: {
      position: 'relative',
      height: '100%',
      width: '100%',
    },
    largeCircle: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#F28B25',
      opacity: 0.2,
      top: 50,
      left: -20,
    },
    mediumCircle: {
      position: 'absolute',
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#1E88E5',
      opacity: 0.3,
      top: 120,
      right: 20,
    },
    largeSquare: {
      position: 'absolute',
      width: 100,
      height: 100,
      backgroundColor: '#2E7D32',
      opacity: 0.2,
      transform: 'rotate(30deg)',
      top: 220,
      left: 30,
    },
    wavyLine: {
      position: 'absolute',
      width: 150,
      height: 3,
      backgroundColor: '#F28B25',
      opacity: 0.4,
      transform: 'rotate(-15deg)',
      top: 380,
      left: 0,
    },
    wavyLine2: {
      position: 'absolute',
      width: 120,
      height: 3,
      backgroundColor: '#1E88E5',
      opacity: 0.4,
      transform: 'rotate(-15deg)',
      top: 390,
      left: 0,
    },
    wavyLine3: {
      position: 'absolute',
      width: 90,
      height: 3,
      backgroundColor: '#2E7D32',
      opacity: 0.4,
      transform: 'rotate(-15deg)',
      top: 400,
      left: 0,
    },
    floatingRect: {
      position: 'absolute',
      width: 60,
      height: 40,
      backgroundColor: '#F28B25',
      opacity: 0.3,
      transform: 'rotate(45deg)',
      top: 500,
      right: 40,
    },
    floatingRect2: {
      position: 'absolute',
      width: 40,
      height: 60,
      backgroundColor: '#1E88E5',
      opacity: 0.3,
      transform: 'rotate(-15deg)',
      top: 600,
      left: 30,
    },
    decorativeDots: {
      position: 'absolute',
      flexDirection: 'row',
      top: 700,
      left: 20,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#2E7D32',
      opacity: 0.5,
      marginRight: 15,
    },
  });

  const CVDocument = () => (
    <Document>
      {/* Première page */}
      <Page size="A4" style={styles.page}>
        {/* Formes décoratives */}
        <View style={styles.decorativeShape1} />
        <View style={styles.decorativeShape2} />
        <View style={styles.decorativeShape3} />
        <View style={styles.decorativeShape4} />
        <View style={styles.decorativeShape5} />
        <View style={styles.decorativeShape6} />
        <View style={styles.decorativeShape7} />
        <View style={styles.decorativeDot1} />
        <View style={styles.decorativeDot2} />

        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image src="/image.png" style={styles.profileImage} />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.name}>{defaultData.personalInfo.name}</Text>
            <Text style={styles.title}>{defaultData.personalInfo.title}</Text>
            <Text style={styles.contactInfo}>{defaultData.personalInfo.email}</Text>
            <Text style={styles.contactInfo}>{defaultData.personalInfo.phone}</Text>
            <Text style={styles.contactInfo}>{defaultData.personalInfo.location}</Text>
            <Text style={styles.contactInfo}>{defaultData.personalInfo.birthDate}</Text>
          </View>
        </View>

        {/* Citation */}
        <View style={styles.quote}>
          <Text>"{defaultData.professionalSummary}"</Text>
        </View>

        {/* Contenu principal */}
        <View style={styles.mainContent}>
          <View style={styles.columnDivider} />
          {/* Colonne gauche */}
          <View style={styles.leftColumn}>
            <View style={styles.sectionTitle}>
              <View style={styles.sectionTitleContainer}>
                <Text>{titles.experiences}</Text>
                <View style={[styles.sectionIconMain, { backgroundColor: '#000000' }]} />
              </View>
            </View>
            {defaultData.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{exp.title}</Text>
                <Text style={styles.experienceCompany}>{exp.company}</Text>
                <Text style={styles.experienceDate}>{exp.period}</Text>
                <Text style={styles.experienceDescription}>
                  {exp.achievements.join("\n")}
                </Text>
              </View>
            ))}

            <View style={styles.sectionTitle}>
              <View style={styles.sectionTitleContainer}>
                <Text>{titles.education}</Text>
                <View style={[styles.sectionIconMain, { backgroundColor: '#000000' }]} />
              </View>
            </View>
            {defaultData.education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{edu.degree}</Text>
                <Text style={styles.experienceCompany}>{edu.institution}</Text>
                <Text style={styles.experienceDate}>
                  {edu.year || `${edu.startDate} - ${edu.endDate}`}
                </Text>
              </View>
            ))}

            {/* Certifications */}
            {defaultData.certifications && defaultData.certifications.length > 0 && (
              <>
                <View style={styles.sectionTitle}>
                  <View style={styles.sectionTitleContainer}>
                    <Text>{titles.certifications}</Text>
                    <View style={[styles.sectionIconMain, { backgroundColor: '#000000' }]} />
                  </View>
                </View>
                {defaultData.certifications.map((cert, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.experienceTitle}>{cert.name}</Text>
                    <Text style={styles.experienceCompany}>{cert.issuer}</Text>
                    <Text style={styles.experienceDate}>{cert.year}</Text>
                  </View>
                ))}
              </>
            )}

            {/* Bénévolat */}
            {defaultData.volunteerWork && defaultData.volunteerWork.length > 0 && (
              <>
                <View style={styles.sectionTitle}>
                  <View style={styles.sectionTitleContainer}>
                    <Text>{titles.volunteer}</Text>
                    <View style={[styles.sectionIconMain, { backgroundColor: '#000000' }]} />
                  </View>
                </View>
                {defaultData.volunteerWork.map((vol, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.experienceTitle}>{vol.role}</Text>
                    <Text style={styles.experienceCompany}>{vol.organization}</Text>
                    <Text style={styles.experienceDate}>{vol.period}</Text>
                    <Text style={styles.experienceDescription}>{vol.description}</Text>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* Colonne droite */}
          <View style={styles.rightColumn}>
            <View style={styles.sectionTitle}>
              <View style={styles.sectionTitleContainer}>
                <Text style={{ color: '#F28B25' }}>{titles.skills}</Text>
                <View style={[styles.sectionIcon, { backgroundColor: '#F28B25' }]} />
              </View>
            </View>
            {defaultData.skills.technical.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>• {skill}</Text>
            ))}
            {defaultData.skills.soft.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>• {skill}</Text>
            ))}

            <View style={styles.sectionDivider} />

            <View style={styles.sectionTitle}>
              <View style={styles.sectionTitleContainer}>
                <Text style={{ color: '#1E88E5' }}>{titles.languages}</Text>
                <View style={[styles.sectionIcon, { backgroundColor: '#1E88E5' }]} />
              </View>
            </View>
            {defaultData.languages.map((lang, index) => (
              <Text key={index} style={styles.languageItem}>
                • {lang.language} ({lang.level})
              </Text>
            ))}

            <View style={styles.sectionDivider} />

            <View style={styles.sectionTitle}>
              <View style={styles.sectionTitleContainer}>
                <Text style={{ color: '#2E7D32' }}>{titles.interests}</Text>
                <View style={[styles.sectionIcon, { backgroundColor: '#2E7D32' }]} />
              </View>
            </View>
            {defaultData.hobbies.map((hobby, index) => (
              <Text key={index} style={styles.interestItem}>
                • {hobby.category}
              </Text>
            ))}

            {/* Section artistique */}
            <View style={styles.artContainer}>
              <View style={styles.artCircle1} />
              <View style={styles.artCircle2} />
              
              
              <View style={styles.largeCircle} />
              <View style={styles.mediumCircle} />
              <View style={styles.largeSquare} />
              <View style={styles.wavyLine} />
              <View style={styles.wavyLine2} />
              <View style={styles.wavyLine3} />
              <View style={styles.floatingRect} />
              <View style={styles.floatingRect2} />
              
            </View>
          </View>
        </View>
      </Page>

     
    </Document>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <CVDocument />
      </PDFViewer>
    </div>
  );
}

export default CVPDFArtistique;
