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
    padding: 30,
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: '15 20',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerMain: {
    flex: 1,
    paddingRight: 20,
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 16,
    color: '#444444',
    marginBottom: 4,
  },
  headerContact: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 4,
    textAlign: 'right',
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    marginBottom: 0,
  },
  sectionHeaderWithContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#666666',
    paddingBottom: 4,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 4,
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
        <View style={styles.headerMain}>
          <Text style={styles.headerName}>{data.personalInfo.name}</Text>
          {data.personalInfo.title && (
            <Text style={styles.headerTitle}>{data.personalInfo.title}</Text>
          )}
        </View>
        <View style={styles.headerContact}>          
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          {data.personalInfo.linkedin && (
            <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderWithContent}>
          <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
            {data.language === 'fr' ? 'Résumé Professionnel' : 'Professional Summary'}
          </Text>
        </View>
        <Text style={styles.achievementItem}>{data.professionalSummary}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderWithContent}>
          <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
            {data.language === 'fr' ? 'Compétences' : 'Skills'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>
              {data.language === 'fr' ? 'Techniques:' : 'Technical:'}
            </Text>
            {data.skills.technical.map((skill, i) => (
              <Text key={i} style={styles.achievementItem}>
                • {skill}
              </Text>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>
              {data.language === 'fr' ? 'Personnelles:' : 'Soft Skills:'}
            </Text>
            {data.skills.soft.map((skill, i) => (
              <Text key={i} style={styles.achievementItem}>
                • {skill}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {data.languages && data.languages.length > 0 && (
        <View style={styles.section}>
          <View style={{ marginBottom: 8 }}>
            <View style={styles.sectionHeaderWithContent}>
              <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
                {data.language === 'fr' ? 'Langues' : 'Languages'}
              </Text>
            </View>
            <View style={{ marginTop: 4, marginBottom: 0 }}>
              {data.languages.length <= 3 ? (
                // Si 3 langues ou moins, une seule ligne
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {data.languages.map((lang, index) => (
                    <Text key={index} style={styles.achievementItem}>
                      <Text style={{ fontWeight: 'bold' }}>{lang.language}: </Text>
                      {lang.level}
                    </Text>
                  ))}
                </View>
              ) : (
                // Si plus de 3 langues, deux lignes
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    {data.languages.slice(0, Math.ceil(data.languages.length / 2)).map((lang, index) => (
                      <Text key={index} style={styles.achievementItem}>
                        <Text style={{ fontWeight: 'bold' }}>{lang.language}: </Text>
                        {lang.level}
                      </Text>
                    ))}
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {data.languages.slice(Math.ceil(data.languages.length / 2)).map((lang, index) => (
                      <Text key={index} style={styles.achievementItem}>
                        <Text style={{ fontWeight: 'bold' }}>{lang.language}: </Text>
                        {lang.level}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <View wrap={false} style={{ marginBottom: 8 }}>
          <View style={styles.sectionHeaderWithContent}>
            <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
              {data.language === 'fr' ? 'Expérience Professionnelle' : 'Experience'}
            </Text>
          </View>
          <View style={{ marginTop: 4, marginBottom: 0 }}>
            <View>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{data.experience[0].title}</Text>
              </View>
              <View style={styles.experienceDetails}>
                <Text style={styles.experienceCompany}>{data.experience[0].company} - {data.experience[0].location}</Text>
                <Text>{data.experience[0].period}</Text>
              </View>
              <View style={styles.achievementList}>
                {data.experience[0].achievements.map((achievement, i) => (
                  <Text key={i} style={styles.achievementItem}>
                    • {achievement}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {data.experience.slice(1).map((exp, index) => (
          <View key={index} wrap={false} style={{ marginBottom: 8 }}>
            <View>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{exp.title}</Text>
              </View>
              <View style={styles.experienceDetails}>
                <Text style={styles.experienceCompany}>{exp.company} - {exp.location}</Text>
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
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View wrap={false} style={{ marginBottom: 8 }}>
          <View style={styles.sectionHeaderWithContent}>
            <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
              {data.language === 'fr' ? 'Formation' : 'Education'}
            </Text>
          </View>
          <View style={{ marginTop: 4, marginBottom: 0 }}>
            <View wrap={false}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>
                  {data.education[0].degree} {data.education[0].field && `- ${data.education[0].field}`}
                </Text>
              </View>
              <View style={styles.experienceDetails}>
                <Text>{data.education[0].institution}</Text>
                <Text>{data.education[0].year}</Text>
              </View>
              {data.education[0].highlights && (
                <View style={styles.achievementList}>
                  {data.education[0].highlights.map((highlight, i) => (
                    <Text key={i} style={styles.achievementItem}>
                      • {highlight}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {data.education.slice(1).map((edu, index) => (
          <View key={index} wrap={false} style={{ marginBottom: 8 }}>
            <View>
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
          </View>
        ))}
      </View>

      {data.certifications && data.certifications.length > 0 && (
        <View style={styles.section}>
          <View style={{ marginBottom: 8 }}>
            <View style={styles.sectionHeaderWithContent}>
              <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
                {data.language === 'fr' ? 'Certifications' : 'Certifications'}
              </Text>
            </View>
            <View style={{ marginTop: 4, marginBottom: 0 }}>
              <View>
                <Text style={styles.achievementItem}>
                  {data.certifications[0].name} - {data.certifications[0].issuer} ({data.certifications[0].year})
                </Text>
              </View>
            </View>
          </View>

          {data.certifications.slice(1).map((cert, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <View>
                <Text style={styles.achievementItem}>
                  {cert.name} - {cert.issuer} ({cert.year})
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {data.volunteerWork && data.volunteerWork.length > 0 && (
        <View style={styles.section}>
          <View wrap={false} style={{ marginBottom: 8 }}>
            <View style={styles.sectionHeaderWithContent}>
              <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
                {data.language === 'fr' ? 'Bénévolat' : 'Volunteer Work'}
              </Text>
            </View>
            <View style={{ marginTop: 4, marginBottom: 0 }}>
              <View>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{data.volunteerWork[0].role}</Text>
                </View>
                <View style={styles.experienceDetails}>
                  <Text style={styles.experienceCompany}>{data.volunteerWork[0].organization}</Text>
                  <Text>{data.volunteerWork[0].period}</Text>
                </View>
                <Text style={styles.achievementItem}>{data.volunteerWork[0].description}</Text>
              </View>
            </View>
          </View>

          {data.volunteerWork.slice(1).map((work, index) => (
            <View key={index} wrap={false} style={{ marginBottom: 8 }}>
              <View>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{work.role}</Text>
                </View>
                <View style={styles.experienceDetails}>
                  <Text style={styles.experienceCompany}>{work.organization}</Text>
                  <Text>{work.period}</Text>
                </View>
                <Text style={styles.achievementItem}>{work.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {data.hobbies && data.hobbies.length > 0 && (
        <View style={styles.section}>
          <View style={{ marginBottom: 8 }}>
            <View style={styles.sectionHeaderWithContent}>
              <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
                {data.language === 'fr' ? 'Centres d\'intérêt' : 'Hobbies'}
              </Text>
            </View>
            <View style={{ marginTop: 4, marginBottom: 0 }}>
              <View>
                <Text style={styles.achievementItem}>
                  <Text style={{ fontWeight: 'bold' }}>{data.hobbies[0].category}: </Text>
                  {data.hobbies[0].description}
                </Text>
              </View>
            </View>
          </View>

          {data.hobbies.slice(1).map((hobby, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <View>
                <Text style={styles.achievementItem}>
                  <Text style={{ fontWeight: 'bold' }}>{hobby.category}: </Text>
                  {hobby.description}
                </Text>
              </View>
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
