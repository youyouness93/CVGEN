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
    fontSize: 10,
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
  },
  skillsContainer: {
    marginTop: 4,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 11,
    color: '#444444',
    marginBottom: 4,
    borderBottom: '1px solid #cccccc',
    paddingBottom: 2,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -4,
    marginRight: -4,
  },
  skillItem: {
    backgroundColor: '#f5f5f5',
    padding: '3 8',
    margin: 4,
    borderRadius: 3,
    fontSize: 10,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  languageName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 8,
    width: '30%',
  },
  languageLevel: {
    fontSize: 10,
    color: '#444444',
    flex: 1,
  },
  languageDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666666',
    marginHorizontal: 4,
  },
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

export const CVDocument = ({ data }: CVPDFProps) => (
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

      {data.skills && (data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithContent}>
            <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
              {data.language === 'fr' ? 'Compétences' : 'Skills'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4, gap: 40 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: '#444444', marginBottom: 6, borderBottom: '1px solid #cccccc', paddingBottom: 2 }}>
                {data.language === 'fr' ? 'Techniques' : 'Technical'}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {data.skills.technical.map((skill, i) => (
                  <View key={i} style={{ backgroundColor: '#f5f5f5', padding: '2 8', borderRadius: 3 }}>
                    <Text style={{ fontSize: 10 }}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: '#444444', marginBottom: 6, borderBottom: '1px solid #cccccc', paddingBottom: 2 }}>
                {data.language === 'fr' ? 'Personnelles' : 'Soft Skills'}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {data.skills.soft.map((skill, i) => (
                  <View key={i} style={{ backgroundColor: '#f5f5f5', padding: '2 8', borderRadius: 3 }}>
                    <Text style={{ fontSize: 10 }}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      {data.languages && data.languages.length > 0 && (
        <View style={styles.section}>
          <View style={{ marginBottom: 8 }}>
            <View style={styles.sectionHeaderWithContent}>
              <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
                {data.language === 'fr' ? 'Langues' : 'Languages'}
              </Text>
            </View>
            <View style={{ marginTop: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              {data.languages.map((lang, index) => (
                <View key={index} style={{ backgroundColor: '#f5f5f5', padding: '4 12', borderRadius: 3 }}>
                  <Text style={{ fontSize: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{lang.language}</Text>
                    <Text style={{ color: '#666666' }}> • {lang.level}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

        {/* Uniquement le titre avec wrap={false} */}
        <View wrap={false} style={{ marginBottom: 4 }}>
          <View style={styles.sectionHeaderWithContent}>
            <Text style={{ ...styles.sectionHeader, borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }}>
              {data.language === 'fr' ? 'Expérience Professionnelle' : 'Experience'}
            </Text>
          </View>
        </View>

        {/* Première expérience */}
        <View wrap={false} style={{ marginBottom: 8 }}>
          <View>
            <View style={styles.experienceHeader}>
              <Text style={styles.experienceTitle}>{data.experience[0].title}</Text>
              <Text style={styles.experienceDetails}>{data.experience[0].period}</Text>
            </View>
            <View style={styles.experienceDetails}>
              <Text style={styles.experienceCompany}>{data.experience[0].company} - {data.experience[0].location}</Text>
              
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

        {/* Autres expériences */}
        {data.experience.slice(1).map((exp, index) => (
          <View key={index} wrap={false} style={{ marginBottom: 8 }}>
            <View>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{exp.title}</Text>
                <Text style={styles.experienceDetails}>{exp.period}</Text>
              </View>
              <View style={styles.experienceDetails}>
                <Text style={styles.experienceCompany}>{exp.company} - {exp.location}</Text>
                
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
                <Text style={styles.experienceDetails}>{data.education[0].year}</Text>
              </View>
              <View style={styles.experienceDetails}>
                <Text>{data.education[0].institution}</Text>
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
                <Text style={styles.experienceDetails}>{edu.year}</Text>
              </View>
              <View style={styles.experienceDetails}>
                <Text>{edu.institution}</Text>
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
                  <Text style={styles.experienceDetails}>{data.volunteerWork[0].period}</Text>
                </View>
                <View style={styles.experienceDetails}>
                  <Text style={styles.experienceCompany}>{data.volunteerWork[0].organization}</Text>
                  
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
                  <Text>{work.period}</Text>
                </View>
                <View style={styles.experienceDetails}>
                  <Text style={styles.experienceCompany}>{work.organization}</Text>
                  
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <CVDocument data={data} />
      </PDFViewer>
      <PDFDownloadLink
        document={<CVDocument data={data} />}
        fileName={`CV-${data.personalInfo.name.replace(/\s+/g, '-')}.pdf`}
        className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-center shadow-lg transition-colors"
      >
        {({ loading }) =>
          loading ? 'Préparation du PDF...' : 'Télécharger le CV'
        }
      </PDFDownloadLink>
      <p className="text-center text-sm text-gray-600">
        Votre CV a été généré avec succès. Cliquez sur le bouton ci-dessus pour le télécharger.
      </p>
    </div>
  );
}
