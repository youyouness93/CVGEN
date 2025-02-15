import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

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
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333333',
    backgroundColor: '#f5f5f5',
    padding: '4 8',
    borderRadius: 4,
  },
  experienceItem: {
    marginBottom: 12,
    breakInside: 'avoid',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 4,
  },
  itemContent: {
    fontSize: 11,
    lineHeight: 1.3,
    marginBottom: 2,
  },
  bulletPoint: {
    marginBottom: 1,
    paddingLeft: 12,
    position: 'relative',
  },
  bullet: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 11,
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 4,
  },
  viewer: {
    width: '100%',
    height: '100vh',
  },
  skillsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  skillColumn: {
    flex: 1,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  experienceDate: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'right',
  },
  sectionGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
  },
  remainingItems: {
    marginTop: 12,
  },
  bold: {
    fontWeight: 'bold'
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

export function CVPDF({ data }: CVPDFProps) {
  // Déterminer la langue du CV (par défaut en anglais)
  const language = data.language || 'en';
  const titles = {
    professionalSummary: language === 'fr' ? 'Résumé professionnel' : 'Professional Summary',
    skills: language === 'fr' ? 'Compétences' : 'Skills',
    technicalSkills: language === 'fr' ? 'Compétences techniques' : 'Technical Skills',
    softSkills: language === 'fr' ? 'Soft Skills' : 'Soft Skills',
    languages: language === 'fr' ? 'Langues' : 'Languages',
    experience: language === 'fr' ? 'Expérience professionnelle' : 'Work Experience',
    education: language === 'fr' ? 'Formation' : 'Education',
    certifications: language === 'fr' ? 'Certifications' : 'Certifications',
    volunteerWork: language === 'fr' ? 'Bénévolat' : 'Volunteer Work',
    hobbies: language === 'fr' ? 'Loisirs et Intérêts' : 'Hobbies and Interests',
  };

  const layout = data.layout;

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* En-tête avec informations personnelles */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>{data.personalInfo.name}</Text>
              <Text style={styles.title}>
                {data.personalInfo.title || 
                 (data.jobData?.jobTitle || data.professionalSummary.split('.')[0])}
              </Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
              {data.personalInfo.linkedin && (
                <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
              )}
            </View>
          </View>

          {/* Résumé professionnel */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.professionalSummary}</Text>
            <Text style={styles.itemContent}>{data.professionalSummary}</Text>
          </View>

          {/* Compétences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.skills}</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillColumn}>
                <Text style={styles.itemTitle}>Compétences techniques</Text>
                <View style={styles.skills}>
                  {data.skills.technical.map((skill, index) => (
                    <Text key={index} style={styles.skill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.skillColumn}>
                <Text style={styles.itemTitle}>Soft Skills</Text>
                <View style={styles.skills}>
                  {data.skills.soft.map((skill, index) => (
                    <Text key={index} style={styles.skill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Langues */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.languages}</Text>
            <View style={styles.skills}>
              {data.languages.map((lang, index) => (
                <Text key={index} style={styles.skill}>
                  {lang.language} - {lang.level}
                </Text>
              ))}
            </View>
          </View>

          {/* Expérience professionnelle */}
          {data.experience.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionGroup}>
                <Text style={styles.sectionTitle}>{titles.experience}</Text>
                <View style={{
                  ...styles.experienceItem,
                  marginBottom: 12
                }}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {data.experience[0].title} - {data.experience[0].company}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {data.experience[0].period}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {data.experience[0].location}
                  </Text>
                  {data.experience[0].achievements.map((achievement, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.itemContent}>{achievement}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {data.experience.slice(1).map((exp, index) => (
                <View 
                  key={index} 
                  style={{
                    ...styles.experienceItem,
                    ...(index < data.experience.length - 2 ? { marginBottom: 12 } : {})
                  }}
                >
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {exp.title} - {exp.company}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {exp.period}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {exp.location}
                  </Text>
                  {exp.achievements.map((achievement, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.itemContent}>{achievement}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Formation */}
          {data.education.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionGroup} wrap={false}>
                <Text style={styles.sectionTitle}>{titles.education}</Text>
                <View style={{
                  ...styles.experienceItem,
                  marginBottom: 12
                }}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {data.education[0].degree} en {data.education[0].field}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {data.education[0].startDate} - {data.education[0].endDate}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {data.education[0].institution} {data.education[0].location ? `• ${data.education[0].location}` : ''}
                  </Text>
                  {data.education[0].highlights?.map((highlight, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.itemContent}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {data.education.slice(1).map((edu, index) => (
                <View 
                  key={index} 
                  style={{
                    ...styles.experienceItem,
                    ...(index < data.education.length - 2 ? { marginBottom: 12 } : {})
                  }}
                >
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {edu.degree} en {edu.field}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {edu.institution} {edu.location ? `• ${edu.location}` : ''}
                  </Text>
                  {edu.highlights?.map((highlight, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.itemContent}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionGroup} wrap={false}>
                <Text style={styles.sectionTitle}>{titles.certifications}</Text>
                <View style={{
                  ...styles.experienceItem,
                  marginBottom: 12
                }}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>{data.certifications[0].name}</Text>
                    <Text style={styles.experienceDate}>{data.certifications[0].year}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {data.certifications[0].issuer}
                  </Text>
                </View>
              </View>
              {data.certifications.slice(1).map((cert, index) => (
                <View 
                  key={index} 
                  style={{
                    ...styles.experienceItem,
                    ...(index < data.certifications.length - 2 ? { marginBottom: 12 } : {})
                  }}
                >
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>{cert.name}</Text>
                    <Text style={styles.experienceDate}>{cert.year}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {cert.issuer}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Bénévolat */}
          {data.volunteerWork && data.volunteerWork.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.volunteerWork}</Text>
              {data.volunteerWork.map((work, index) => (
                <View key={index} style={{ marginBottom: index < data.volunteerWork!.length - 1 ? 12 : 0 }}>
                  <Text style={styles.itemTitle}>{work.role}</Text>
                  <Text style={styles.itemSubtitle}>
                    {work.organization} • {work.period}
                  </Text>
                  <Text style={styles.itemContent}>{work.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Loisirs et Intérêts */}
          {data.hobbies && data.hobbies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.hobbies}</Text>
              {data.hobbies.map((hobby, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <Text style={{
                    ...styles.itemContent,
                    fontWeight: 'bold'
                  }}>{hobby.category}</Text>
                  <Text style={styles.itemContent}>{hobby.description}</Text>
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}
