'use client';

import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from '@react-pdf/renderer';

// Fonction pour détecter si on est sur mobile
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
};

// Définition des styles avec les tailles exactes demandées
const styles = StyleSheet.create({
  page: {
    padding: '30 30 30 30',
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#333333',
  },
  header: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: '30%',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
  },
  title: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 8,
    textAlign: 'left',
  },
  contactItem: {
    fontSize: 11,
    marginBottom: 4,
    textAlign: 'right',
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    paddingBottom: 4,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  experienceCompany: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  experienceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    color: '#666666',
  },
  achievementList: {
    marginLeft: 15,
  },
  achievementItem: {
    marginBottom: 4,
    textAlign: 'justify',
  }
});

export interface CVPDFProps {
  data: {
    language?: 'fr' | 'en';
    layout: {
      margins: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      spacing: {
        sectionSpacing: number;
        itemSpacing: number;
        lineHeight: number;
        fontSize: {
          name: number;
          title: number;
          sectionTitle: number;
          normal: number;
        };
      };
    };
    personalInfo: {
      name: string;
      title?: string;
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
    };
    professionalSummary: string;
    skills: {
      technical: string[];
      soft: string[];
    };
    languages: Array<{
      language: string;
      level: string;
    }>;
    experience: Array<{
      title: string;
      company: string;
      location: string;
      period: string;
      achievements: string[];
    }>;
    education: Array<{
      degree: string;
      field: string;
      institution: string;
      location: string;
      year: string;
      startDate: string;
      endDate: string;
      highlights?: string[];
    }>;
    certifications: Array<{
      name: string;
      issuer: string;
      year: string;
    }>;
    volunteerWork: Array<{
      organization: string;
      role: string;
      period: string;
      description: string;
    }>;
    hobbies: Array<{
      category: string;
      description: string;
    }>;
    jobData?: {
      jobTitle: string;
    };
  };
}

const CVDocument = ({ data }: CVPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          {data.personalInfo.title && (
            <Text style={styles.title}>{data.personalInfo.title}</Text>
          )}
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && (
            <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          {data.language === 'fr' ? 'Résumé Professionnel' : 'Professional Summary'}
        </Text>
        <Text style={styles.achievementItem}>{data.professionalSummary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          {data.language === 'fr' ? 'Compétences' : 'Skills'}
        </Text>
        <Text style={styles.achievementItem}>
          {data.language === 'fr' ? 'Techniques: ' : 'Technical: '}
          {data.skills.technical.join(', ')}
        </Text>
        <Text style={styles.achievementItem}>
          {data.language === 'fr' ? 'Personnelles: ' : 'Soft Skills: '}
          {data.skills.soft.join(', ')}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          {data.language === 'fr' ? 'Expérience Professionnelle' : 'Experience'}
        </Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <View style={styles.experienceHeader}>
              <Text style={styles.experienceTitle}>{exp.title}</Text>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
            </View>
            <View style={styles.experienceDetails}>
              <Text>{exp.location}</Text>
              <Text>{exp.period}</Text>
            </View>
            <View style={styles.achievementList}>
              {exp.achievements.map((achievement, i) => (
                <Text key={i} style={styles.achievementItem}>
                  • {achievement}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          {data.language === 'fr' ? 'Formation' : 'Education'}
        </Text>
        {data.education.map((edu, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <View style={styles.experienceHeader}>
              <Text style={styles.experienceTitle}>
                {edu.degree} {edu.field && `- ${edu.field}`}
              </Text>
            </View>
            <View style={styles.experienceDetails}>
              <Text>{edu.institution}</Text>
              <Text>{edu.year}</Text>
            </View>
            {edu.highlights && (
              <View style={styles.achievementList}>
                {edu.highlights.map((highlight, i) => (
                  <Text key={i} style={styles.achievementItem}>
                    • {highlight}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {data.certifications && data.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            {data.language === 'fr' ? 'Certifications' : 'Certifications'}
          </Text>
          {data.certifications.map((cert, index) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={styles.achievementItem}>
                {cert.name} - {cert.issuer} ({cert.year})
              </Text>
            </View>
          ))}
        </View>
      )}

      {data.volunteerWork && data.volunteerWork.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            {data.language === 'fr' ? 'Bénévolat' : 'Volunteer Work'}
          </Text>
          {data.volunteerWork.map((work, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{work.role}</Text>
                <Text style={styles.experienceCompany}>{work.organization}</Text>
              </View>
              <View style={styles.experienceDetails}>
                <Text>{work.period}</Text>
              </View>
              <Text style={styles.achievementItem}>{work.description}</Text>
            </View>
          ))}
        </View>
      )}

      {data.hobbies && data.hobbies.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            {data.language === 'fr' ? 'Centres d\'intérêt' : 'Hobbies'}
          </Text>
          {data.hobbies.map((hobby, index) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={styles.achievementItem}>
                <Text style={{ fontWeight: 'bold' }}>{hobby.category}: </Text>
                {hobby.description}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export function CVPDF({ data }: CVPDFProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsMobileDevice(isMobile());
  }, []);

  if (!isClient) {
    return <div>Chargement...</div>;
  }

  if (isMobileDevice) {
    return (
      <div className="p-4">
        <p className="text-center mb-4 text-gray-600">
          Pour une meilleure expérience sur mobile, nous vous recommandons de télécharger le CV directement.
        </p>
        <PDFDownloadLink
          document={<CVDocument data={data} />}
          fileName={`CV-${data.personalInfo.name.replace(/\s+/g, '-')}.pdf`}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-center block mx-auto w-fit shadow-lg transition-colors"
        >
          {({ loading }) =>
            loading ? 'Préparation du PDF...' : 'Télécharger le CV'
          }
        </PDFDownloadLink>
      </div>
    );
  }

  return (
    <PDFViewer style={{ width: '100%', height: '90vh' }}>
      <CVDocument data={data} />
    </PDFViewer>
  );
}
