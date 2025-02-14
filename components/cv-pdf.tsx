import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import { sectionTitles } from '../lib/section-titles';

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
  const titles = sectionTitles[language];
  const layout = data.layout;

  const styles = StyleSheet.create({
    page: {
      padding: `${layout.margins.top} ${layout.margins.right} ${layout.margins.bottom} ${layout.margins.left}`,
      fontFamily: 'Helvetica'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: layout.spacing.sectionSpacing,
      borderBottomWidth: 0.5,
      borderBottomColor: '#666',
      paddingBottom: layout.spacing.itemSpacing * 2,
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      width: '40%',
      borderLeftWidth: 0.5,
      borderLeftColor: '#666',
      paddingLeft: layout.spacing.itemSpacing * 2,
      marginLeft: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    name: {
      fontSize: layout.spacing.fontSize.name,
      fontFamily: 'Helvetica-Bold',
      marginBottom: layout.spacing.itemSpacing,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    jobTitle: {
      fontSize: layout.spacing.fontSize.title,
      color: '#444',
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
    section: {
      marginBottom: layout.spacing.sectionSpacing,
    },
    sectionTitle: {
      fontSize: layout.spacing.fontSize.sectionTitle,
      backgroundColor: '#f0f0f0',
      padding: `${layout.spacing.itemSpacing} ${layout.spacing.itemSpacing * 2}`,
      marginBottom: layout.spacing.itemSpacing * 2,
      fontFamily: 'Helvetica-Bold',
    },
    itemTitle: {
      fontSize: layout.spacing.fontSize.title,
      fontFamily: 'Helvetica-Bold',
      marginBottom: layout.spacing.itemSpacing,
    },
    itemSubtitle: {
      fontSize: layout.spacing.fontSize.normal,
      color: '#666',
      marginBottom: layout.spacing.itemSpacing,
    },
    text: {
      fontSize: layout.spacing.fontSize.normal,
      marginBottom: layout.spacing.itemSpacing,
      lineHeight: layout.spacing.lineHeight,
    },
    bullet: {
      width: '100%',
      flexDirection: 'row',
      marginBottom: layout.spacing.itemSpacing,
    },
    bulletPoint: {
      width: layout.spacing.itemSpacing * 3,
      fontSize: layout.spacing.fontSize.normal,
    },
    bulletText: {
      flex: 1,
      fontSize: layout.spacing.fontSize.normal,
      lineHeight: layout.spacing.lineHeight,
    },
    skillsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: layout.spacing.sectionSpacing,
    },
    skillCategory: {
      width: '48%',
    },
    skillTitle: {
      fontSize: layout.spacing.fontSize.normal,
      fontFamily: 'Helvetica-Bold',
      marginBottom: layout.spacing.itemSpacing,
    },
    skillList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: layout.spacing.itemSpacing,
    },
    skill: {
      backgroundColor: '#e9ecef',
      padding: `${layout.spacing.itemSpacing / 2} ${layout.spacing.itemSpacing}`,
      borderRadius: 2,
      fontSize: layout.spacing.fontSize.normal,
      marginBottom: layout.spacing.itemSpacing,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: layout.spacing.itemSpacing,
      justifyContent: 'flex-end',
    },
    contactIcon: {
      width: layout.spacing.itemSpacing * 4,
      marginRight: layout.spacing.itemSpacing,
      textAlign: 'center',
      fontSize: layout.spacing.fontSize.normal,
      color: '#666',
    },
    contactText: {
      fontSize: layout.spacing.fontSize.normal,
      textAlign: 'right',
    },
    language: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    languageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: layout.spacing.itemSpacing * 2,
    },
    languageName: {
      fontSize: layout.spacing.fontSize.normal,
      fontFamily: 'Helvetica-Bold',
    },
    languageLevel: {
      fontSize: layout.spacing.fontSize.normal,
      color: '#666',
      marginLeft: layout.spacing.itemSpacing,
    },
    separator: {
      fontSize: layout.spacing.fontSize.normal,
      color: '#666',
      marginHorizontal: layout.spacing.itemSpacing,
    },
    bold: {
      fontFamily: 'Helvetica-Bold',
    }
  });

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* En-tête avec informations personnelles */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>{data.personalInfo.name}</Text>
              <Text style={styles.jobTitle}>
                {data.personalInfo.title || 
                 (data.jobData?.jobTitle || data.professionalSummary.split('.')[0])}
              </Text>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>✉</Text>
                <Text style={styles.contactText}>{data.personalInfo.email}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>☏</Text>
                <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>⌂</Text>
                <Text style={styles.contactText}>{data.personalInfo.location}</Text>
              </View>
              {data.personalInfo.linkedin && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>in</Text>
                  <Text style={styles.contactText}>{data.personalInfo.linkedin}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Résumé professionnel */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.professionalSummary}</Text>
            <Text style={styles.text}>{data.professionalSummary}</Text>
          </View>

          {/* Compétences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.skills}</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillCategory}>
                <Text style={styles.skillTitle}>{titles.technicalSkills}</Text>
                <View style={styles.skillList}>
                  {data.skills.technical.map((skill, index) => (
                    <Text key={index} style={styles.skill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.skillCategory}>
                <Text style={styles.skillTitle}>{titles.softSkills}</Text>
                <View style={styles.skillList}>
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
            <View style={styles.languageContainer}>
              {data.languages.map((lang, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {index > 0 && (
                    <Text style={styles.separator}>•</Text>
                  )}
                  <View style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.language}</Text>
                    <Text style={styles.languageLevel}>({lang.level})</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Expérience professionnelle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.experience}</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: layout.spacing.itemSpacing * 2 }}>
                <Text style={styles.itemTitle}>
                  {exp.title} - {exp.company}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {exp.location} | {exp.period}
                </Text>
                {exp.achievements.map((achievement, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Formation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.education}</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: layout.spacing.itemSpacing * 2 }}>
                <Text style={styles.itemTitle}>
                  {edu.degree} en {edu.field}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {edu.institution} - {edu.location} | {edu.year}
                </Text>
              </View>
            ))}
          </View>

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.certifications}</Text>
              {data.certifications.map((cert, index) => (
                <View key={index} style={{ marginBottom: layout.spacing.itemSpacing }}>
                  <Text style={styles.text}>
                    {cert.name} - {cert.issuer} ({cert.year})
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Bénévolat */}
          {data.volunteerWork && data.volunteerWork.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.volunteerWork}</Text>
              {data.volunteerWork.map((vol, index) => (
                <View key={index} style={{ marginBottom: layout.spacing.itemSpacing * 2 }}>
                  <Text style={styles.itemTitle}>
                    {vol.role} - {vol.organization}
                  </Text>
                  <Text style={styles.itemSubtitle}>{vol.period}</Text>
                  <Text style={styles.text}>{vol.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Loisirs et Intérêts */}
          {data.hobbies && data.hobbies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.hobbies}</Text>
              {data.hobbies.map((hobby, index) => (
                <View key={index} style={{ marginBottom: layout.spacing.itemSpacing }}>
                  <Text style={[styles.text, styles.bold]}>{hobby.category}</Text>
                  <Text style={styles.text}>{hobby.description}</Text>
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}
