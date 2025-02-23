'use client';

import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import type { CVPDFProps } from './cv-pdf';

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

export function CVPDFEuropeen({ data }: CVPDFProps) {
  // Valeurs par défaut pour les champs manquants
  const defaultData: DefaultData = {
    personalInfo: {
      name: data?.personalInfo?.name || "Later",
      title: data?.personalInfo?.title || "Later",
      email: data?.personalInfo?.email || "Later",
      phone: data?.personalInfo?.phone || "Later",
      location: data?.personalInfo?.location || "Later",
      birthDate: data?.personalInfo?.birthDate || "14/08/1990",
      drivingLicense: data?.personalInfo?.drivingLicense || "Permis B",
      image: data?.personalInfo?.image || "",
    },
    professionalSummary: data?.professionalSummary || "Later",
    skills: {
      technical: data?.skills?.technical || ["Later"],
      soft: data?.skills?.soft || ["Later"],
    },
    languages: data?.languages || [
      { language: "Later", level: "Later" },
    ],
    experience: data.experience || [],
    education: data.education || [],
    certifications: data.certifications || [],
    volunteerWork: data.volunteerWork || [
      {
        organization: "Later",
        role: "Later",
        period: "Later",
        description: "Later"
      }
    ],
    hobbies: data.hobbies || [{ category: "Later", description: "Later" }]
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: 'white',
      fontFamily: 'Helvetica',
    },
    leftColumn: {
      width: '25%',
      backgroundColor: '#296492',
      padding: '0 15',
      color: 'white',
      fontFamily: 'Helvetica',
    },
    rightColumn: {
      width: '75%',
      padding: '5 36 25 25',
      fontFamily: 'Helvetica',
    },
    rightColumnContent: {
      breakInside: 'avoid',
      marginTop: 10,
    },
    profileImage: {
      width: '100%',
      height: 150,
      marginTop: 10,
      marginBottom: 2,
      borderRadius: 0,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 8,
      color: 'white',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica',
    },
    sectionTitleBold: {
      fontSize: 10,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 8,
      color: 'white',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica-Bold',
    },
    underlinedTitleContainer: {
      marginTop: 10,
      marginBottom: 8,
    },
    underlinedTitleText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
      textTransform: 'uppercase',
      marginBottom: 2,
      fontFamily: 'Helvetica-Bold',
    },
    underlinedTitleLine: {
      width: '98%',
      height: 1,
      backgroundColor: 'white',
      
    },
    mainTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 2,
      textTransform: 'uppercase',
      fontFamily: 'Helvetica-Bold',
    },
    subtitle: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 2,
      color: '#666',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica',
    },
    sectionTitleRight: {
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop: 2,
      color: '#296492',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica-Bold',
    },
    infoText: {
      fontSize: 10,
      marginBottom: 2,
      color: 'white',
      lineHeight: 1.4,
      fontFamily: 'Helvetica',
    },
    experienceItem: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    experienceLeft: {
      width: '20%',
    },
    experienceRight: {
      width: '80%',
    },
    experienceTitle: {
      fontSize: 10,
      lineHeight: 1.4,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 0,
      fontFamily: 'Helvetica-Bold',
    },
    experienceDate: {
      fontSize: 10,
      color: '#666',
      fontFamily: 'Helvetica',
    },
    experienceDescription: {
      fontSize: 10,
      color: '#444',
      lineHeight: 1.4,
      marginTop: 2,
      marginBottom: 4,
      fontFamily: 'Helvetica',
    },
    competenceItem: {
      fontSize: 10,
      marginBottom: 2,
      color: 'white',
      lineHeight: 1.4,
      fontFamily: 'Helvetica',
    },
    languageItem: {
      fontSize: 10,
      marginBottom: 2,
      color: 'white',
      lineHeight: 1.4,
      fontFamily: 'Helvetica',
    },
    hobbyItem: {
      fontSize: 10,
      color: '#444',
      lineHeight: 1.4,
      marginBottom: 2,
      fontFamily: 'Helvetica',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
      marginTop: 10,
      textTransform: 'uppercase',
      fontFamily: 'Helvetica-Bold',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10 ,
      color: '#666',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica',
    },
    summary: {
      fontSize: 10,
      marginBottom: 2,
      color: '#444',
      lineHeight: 1.4,
      fontFamily: 'Helvetica',
    },
  });

  const UnderlinedTitle = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.underlinedTitleContainer}>
      <Text style={styles.underlinedTitleText}>{children}</Text>
      <View style={styles.underlinedTitleLine} />
    </View>
  );

  const CVDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Colonne de gauche */}
        <View style={styles.leftColumn}>
          <Image 
            src="/girl.png"
            style={styles.profileImage}
          />
          <UnderlinedTitle>PROFIL</UnderlinedTitle>
          
          <Text style={styles.sectionTitleBold}>ADRESSE</Text>
          <Text style={styles.infoText}>{defaultData.personalInfo.location}</Text>
          
          <Text style={styles.sectionTitleBold}>E-MAIL</Text>
          <Text style={styles.infoText}>{defaultData.personalInfo.email}</Text>
          
          <Text style={styles.sectionTitleBold}>TELEPHONE</Text>
          <Text style={styles.infoText}>{defaultData.personalInfo.phone}</Text>
          
          <Text style={styles.sectionTitleBold}>DATE DE NAISSANCE</Text>
          <Text style={styles.infoText}>{defaultData.personalInfo.birthDate}</Text>
          
          <Text style={styles.sectionTitleBold}>PERMIS</Text>
          <Text style={styles.infoText}>{defaultData.personalInfo.drivingLicense}</Text>
          
          <UnderlinedTitle>LANGUES</UnderlinedTitle>
          {defaultData.languages.map((language: Language, index: number) => (
            <Text key={index} style={styles.languageItem}>{language.language} ({language.level})</Text>
          ))}

          <UnderlinedTitle>COMPETENCES</UnderlinedTitle>
          {defaultData.skills.technical.concat(defaultData.skills.soft).map((skill: string, index: number) => (
            <Text key={index} style={styles.competenceItem}>• {skill}</Text>
          ))}
          
          
          
          
        </View>

        {/* Colonne de droite */}
        <View style={styles.rightColumn}>
          {/* En-tête */}
          <View wrap={false}>
            <Text style={styles.name}>{defaultData.personalInfo.name}</Text>
            <Text style={styles.title}>{defaultData.personalInfo.title}</Text>
            <Text style={styles.summary}>{defaultData.professionalSummary}</Text>
          </View>

          {/* Expériences */}
          <View style={styles.rightColumnContent} wrap={false}>
            <Text style={styles.sectionTitleRight}>EXPÉRIENCES PROFESSIONNELLES</Text>
            <View style={styles.experienceItem}>
              <View style={styles.experienceLeft}>
                <Text style={styles.experienceDate}>
                  {defaultData.experience[0]?.period.split(' - ').join('\n')}
                </Text>
              </View>
              <View style={styles.experienceRight}>
                <Text style={styles.experienceTitle}>
                  {defaultData.experience[0]?.title} - {defaultData.experience[0]?.company}
                </Text>
                <Text style={styles.experienceDescription}>
                  {defaultData.experience[0]?.achievements.join("\n")}
                </Text>
              </View>
            </View>
          </View>

          {defaultData.experience.slice(1).map((exp, index) => (
            <View style={styles.rightColumnContent} wrap={false} key={index + 1}>
              <View style={styles.experienceItem}>
                <View style={styles.experienceLeft}>
                  <Text style={styles.experienceDate}>
                    {exp.period.split(' - ').join('\n')}
                  </Text>
                </View>
                <View style={styles.experienceRight}>
                  <Text style={styles.experienceTitle}>
                    {exp.title} - {exp.company}
                  </Text>
                  <Text style={styles.experienceDescription}>
                    {exp.achievements.join("\n")}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Formations */}
          <View style={styles.rightColumnContent} wrap={false}>
            <Text style={styles.sectionTitleRight}>FORMATIONS</Text>
            <View style={styles.experienceItem}>
              <View style={styles.experienceLeft}>
                <Text style={styles.experienceDate}>
                  {defaultData.education[0]?.year ? `sept. ${defaultData.education[0]?.year}\njuin ${defaultData.education[0]?.year}` : `${defaultData.education[0]?.startDate}\n${defaultData.education[0]?.endDate}`}
                </Text>
              </View>
              <View style={styles.experienceRight}>
                <Text style={styles.experienceTitle}>
                  {defaultData.education[0]?.degree}{defaultData.education[0]?.field ? ` en ${defaultData.education[0]?.field}` : ''}
                </Text>
                <Text style={styles.experienceDescription}>
                  {defaultData.education[0]?.institution}{defaultData.education[0]?.location ? `, ${defaultData.education[0]?.location}` : ''}
                </Text>
                {defaultData.education[0]?.highlights && defaultData.education[0]?.highlights.length > 0 && (
                  <Text style={styles.experienceDescription}>
                    {defaultData.education[0]?.highlights.join("\n")}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {defaultData.education.slice(1).map((edu, index) => (
            <View style={styles.rightColumnContent} wrap={false} key={index + 1}>
              <View style={styles.experienceItem}>
                <View style={styles.experienceLeft}>
                  <Text style={styles.experienceDate}>
                    {edu.year ? `sept. ${edu.year}\njuin ${edu.year}` : `${edu.startDate}\n${edu.endDate}`}
                  </Text>
                </View>
                <View style={styles.experienceRight}>
                  <Text style={styles.experienceTitle}>
                    {edu.degree}{edu.field ? ` en ${edu.field}` : ''}
                  </Text>
                  <Text style={styles.experienceDescription}>
                    {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                  </Text>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <Text style={styles.experienceDescription}>
                      {edu.highlights.join("\n")}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}

          {/* Certifications */}
          <View style={styles.rightColumnContent} wrap={false}>
            <Text style={styles.sectionTitleRight}>CERTIFICATIONS</Text>
            <View style={styles.experienceItem}>
              <View style={styles.experienceLeft}>
                <Text style={styles.experienceDate}>
                  {defaultData.certifications[0]?.year}
                </Text>
              </View>
              <View style={styles.experienceRight}>
                <Text style={styles.experienceTitle}>
                  {defaultData.certifications[0]?.name}
                </Text>
                <Text style={styles.experienceDescription}>
                  {defaultData.certifications[0]?.issuer}
                </Text>
              </View>
            </View>
          </View>

          {defaultData.certifications.slice(1).map((cert, index) => (
            <View style={styles.rightColumnContent} wrap={false} key={index + 1}>
              <View style={styles.experienceItem}>
                <View style={styles.experienceLeft}>
                  <Text style={styles.experienceDate}>
                    {cert.year}
                  </Text>
                </View>
                <View style={styles.experienceRight}>
                  <Text style={styles.experienceTitle}>
                    {cert.name}
                  </Text>
                  <Text style={styles.experienceDescription}>
                    {cert.issuer}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Bénévolat */}
          <View style={styles.rightColumnContent} wrap={false}>
            <Text style={styles.sectionTitleRight}>BÉNÉVOLAT</Text>
            <View style={styles.experienceItem}>
              <View style={styles.experienceLeft}>
                <Text style={styles.experienceDate}>
                  {defaultData.volunteerWork[0]?.period?.split(' - ').join('\n')}
                </Text>
              </View>
              <View style={styles.experienceRight}>
                <Text style={styles.experienceTitle}>
                  {defaultData.volunteerWork[0]?.role} - {defaultData.volunteerWork[0]?.organization}
                </Text>
                <Text style={styles.experienceDescription}>
                  {defaultData.volunteerWork[0]?.description}
                </Text>
              </View>
            </View>
          </View>

          {defaultData.volunteerWork.slice(1).map((vol, index) => (
            <View style={styles.rightColumnContent} wrap={false} key={index + 1}>
              <View style={styles.experienceItem}>
                <View style={styles.experienceLeft}>
                  <Text style={styles.experienceDate}>
                    {vol.period?.split(' - ').join('\n')}
                  </Text>
                </View>
                <View style={styles.experienceRight}>
                  <Text style={styles.experienceTitle}>
                    {vol.role} - {vol.organization}
                  </Text>
                  <Text style={styles.experienceDescription}>
                    {vol.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
