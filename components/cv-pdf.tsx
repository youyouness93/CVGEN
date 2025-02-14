import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

// Définition des titres de sections par langue
const sectionTitles = {
  fr: {
    professionalSummary: 'Résumé professionnel',
    skills: 'Compétences',
    technicalSkills: 'Compétences techniques',
    softSkills: 'Compétences générales',
    languages: 'Langues',
    experience: 'Expérience professionnelle',
    education: 'Formation',
    certifications: 'Certifications',
    volunteerWork: 'Bénévolat',
    hobbies: 'Loisirs et Intérêts'
  },
  en: {
    professionalSummary: 'Professional Summary',
    skills: 'Skills',
    technicalSkills: 'Technical Skills',
    softSkills: 'Soft Skills',
    languages: 'Languages',
    experience: 'Professional Experience',
    education: 'Education',
    certifications: 'Certifications',
    volunteerWork: 'Volunteer Work',
    hobbies: 'Hobbies & Interests'
  }
};

interface CVPDFProps {
  data: {
    language?: 'fr' | 'en'; // Langue du CV
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
      email: string;
      phone: string;
      location: string;
      title?: string;
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
  };
}

function getProgressBarColor(level: string): string {
  const levels: { [key: string]: string } = {
    'Native': '#333333',
    'Bilingual': '#333333',
    'Fluent': '#4d4d4d',
    'Advanced': '#4d4d4d',
    'Intermediate': '#666666',
    'Basic': '#808080',
    'Beginner': '#808080',
    // Versions françaises
    'Natif': '#333333',
    'Bilingue': '#333333',
    'Courant': '#4d4d4d',
    'Avancé': '#4d4d4d',
    'Intermédiaire': '#666666',
    'Débutant': '#808080',
    'Base': '#808080',
  };
  return levels[level] || '#999999';
}

function getProgressBarWidth(level: string): string {
  const levels: { [key: string]: string } = {
    'Native': '100%',
    'Bilingual': '100%',
    'Fluent': '90%',
    'Advanced': '80%',
    'Intermediate': '60%',
    'Basic': '40%',
    'Beginner': '30%',
    // Versions françaises
    'Natif': '100%',
    'Bilingue': '100%',
    'Courant': '90%',
    'Avancé': '80%',
    'Intermédiaire': '60%',
    'Débutant': '40%',
    'Base': '30%',
  };
  return levels[level] || '50%';
}

export function CVPDF({ data }: CVPDFProps) {
  // Déterminer la langue du CV (par défaut en anglais)
  const language = data.language || 'en';
  const titles = sectionTitles[language];

  const { margins, spacing } = data.layout;

  const styles = StyleSheet.create({
    page: {
      paddingTop: margins.top,
      paddingBottom: margins.bottom,
      paddingLeft: margins.left,
      paddingRight: margins.right,
      fontFamily: 'Helvetica',
    },
    section: {
      marginBottom: spacing.sectionSpacing,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sectionSpacing,
      borderBottom: 1,
      borderBottomColor: '#e9ecef',
      paddingBottom: spacing.sectionSpacing * 0.75,
      backgroundColor: '#ffffff',
    },
    sectionTitle: {
      fontSize: spacing.fontSize.sectionTitle,
      backgroundColor: '#f0f0f0',
      padding: '4 5',
      marginBottom: spacing.itemSpacing,
      fontFamily: 'Helvetica-Bold',
    },
    itemTitle: {
      fontSize: spacing.fontSize.normal,
      fontFamily: 'Helvetica-Bold',
      marginBottom: spacing.itemSpacing,
    },
    itemSubtitle: {
      fontSize: spacing.fontSize.normal,
      color: '#666',
      marginBottom: spacing.itemSpacing,
    },
    text: {
      fontSize: spacing.fontSize.normal,
      marginBottom: spacing.itemSpacing,
      lineHeight: spacing.lineHeight,
    },
    bullet: {
      width: '100%',
      flexDirection: 'row',
      marginBottom: spacing.itemSpacing,
    },
    bulletPoint: {
      width: 8,
      fontSize: spacing.fontSize.normal,
    },
    bulletText: {
      flex: 1,
      fontSize: spacing.fontSize.normal,
      lineHeight: spacing.lineHeight,
    },
    experienceItem: {
      marginBottom: spacing.sectionSpacing,
    },
    educationItem: {
      marginBottom: spacing.sectionSpacing,
    },
    certificationItem: {
      marginBottom: spacing.sectionSpacing,
    },
    volunteerItem: {
      marginBottom: spacing.sectionSpacing,
    },
    skillsSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sectionSpacing,
    },
    skillColumn: {
      width: '48%',
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.itemSpacing,
    },
    skill: {
      backgroundColor: '#e9ecef',
      padding: '2 6',
      borderRadius: 3,
      fontSize: spacing.fontSize.normal,
      marginRight: spacing.itemSpacing,
      marginBottom: spacing.itemSpacing,
    },
    languageItem: {
      marginBottom: spacing.sectionSpacing,
    },
    nameSection: {
      flex: 1,
      paddingRight: spacing.itemSpacing * 2,
    },
    name: {
      fontSize: spacing.fontSize.name,
      fontFamily: 'Helvetica-Bold',
      color: '#000000',
      textTransform: 'uppercase',
      marginBottom: spacing.itemSpacing,
    },
    jobTitle: {
      fontSize: spacing.fontSize.title,
      color: '#666666',
      textTransform: 'uppercase',
    },
    contactSection: {
      borderLeftWidth: 1,
      borderLeftColor: '#e9ecef',
      paddingLeft: spacing.itemSpacing,
      width: '35%',
      justifyContent: 'center',
    },
    contactInfoContainer: {
      flexDirection: 'column',
      gap: spacing.itemSpacing,
    },
    contactInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contactValue: {
      fontSize: spacing.fontSize.normal,
      color: '#666666',
      textDecoration: 'none',
    },
    progressBarContainer: {
      width: '45%',
      height: 6,
      backgroundColor: '#f5f5f5',
      marginHorizontal: spacing.itemSpacing,
      borderRadius: 3,
    },
    progressBar: {
      height: '100%',
      borderRadius: 3,
      backgroundColor: '#666666',
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
            <View style={styles.nameSection}>
              <Text style={styles.name}>{data.personalInfo.name}</Text>
              {data.personalInfo.title && (
                <Text style={styles.jobTitle}>{data.personalInfo.title}</Text>
              )}
            </View>
            <View style={styles.contactSection}>
              <View style={styles.contactInfoContainer}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactValue}>{data.personalInfo.phone}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactValue}>{data.personalInfo.email}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactValue}>{data.personalInfo.location}</Text>
                </View>
                {data.personalInfo.linkedin && (
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactValue}>{data.personalInfo.linkedin}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Résumé professionnel */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.professionalSummary}</Text>
            <Text style={[styles.text, { textAlign: 'justify' }]}>{data.professionalSummary}</Text>
          </View>

          {/* Compétences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.skills}</Text>
            <View style={styles.skillsSection}>
              {/* Compétences techniques */}
              <View style={styles.skillColumn}>
                <Text style={styles.itemTitle}>{titles.technicalSkills}</Text>
                <View style={styles.skillsContainer}>
                  {data.skills.technical.map((skill, index) => (
                    <Text key={index} style={styles.skill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>

              {/* Compétences générales */}
              <View style={styles.skillColumn}>
                <Text style={styles.itemTitle}>{titles.softSkills}</Text>
                <View style={styles.skillsContainer}>
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
            {data.languages.map((lang, index) => (
              <View key={index} style={styles.languageItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ width: '30%', fontSize: spacing.fontSize.normal, fontFamily: 'Helvetica-Bold' }}>{lang.language}</Text>
                  <View style={styles.progressBarContainer}>
                    <View style={[
                      styles.progressBar,
                      {
                        backgroundColor: getProgressBarColor(lang.level),
                        width: getProgressBarWidth(lang.level)
                      }
                    ]} />
                  </View>
                  <Text style={{ width: '20%', fontSize: spacing.fontSize.normal, textAlign: 'right', color: '#666' }}>{lang.level}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Expérience professionnelle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.experience}</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
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
              <View key={index} style={styles.educationItem}>
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
                <View key={index} style={styles.certificationItem}>
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
                <View key={index} style={styles.volunteerItem}>
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
                <View key={index} style={{ marginBottom: spacing.sectionSpacing }}>
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
