'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()
  
  return (
    <select 
      className="bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none"
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  )
}

export function Footer() {
  const { language } = useLanguage()
  
  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800">
      {/* Background with grid and gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"></div>
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative container py-16">
        {/* Logo and description */}
        <div className="mb-12">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white mb-4">
              CV Creator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {language === 'fr' 
                ? "Optimisez votre CV avec l'intelligence artificielle et augmentez vos chances de décrocher l'emploi de vos rêves."
                : "Optimize your resume with artificial intelligence and increase your chances of landing your dream job."}
            </p>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              {language === 'fr' ? 'Produit' : 'Product'}
            </h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <Link href="/create" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Créer un CV' : 'Create Resume'}
                </Link>
              </li>
              <li>
                <Link href="/cover-letter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Lettre de motivation' : 'Cover Letter'}
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Modèles de CV' : 'Resume Templates'}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Tarifs' : 'Pricing'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              {language === 'fr' ? 'Ressources' : 'Resources'}
            </h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Guides' : 'Guides'}
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Exemples de CV' : 'Resume Examples'}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              {language === 'fr' ? 'Entreprise' : 'Company'}
            </h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'À propos' : 'About'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Carrières' : 'Careers'}
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Presse' : 'Press'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              {language === 'fr' ? 'Légal' : 'Legal'}
            </h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? "Conditions d'utilisation" : 'Terms of Use'}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Politique des cookies' : 'Cookie Policy'}
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {language === 'fr' ? 'Mentions légales' : 'Legal Notice'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-md mx-auto text-center mb-12">
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
              {language === 'fr' ? 'Restez informé' : 'Stay Informed'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {language === 'fr' 
                ? 'Recevez nos meilleurs conseils pour optimiser votre CV et votre recherche d emploi.'
                : 'Receive our best tips to optimize your resume and job search.'}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={language === 'fr' ? 'Votre email' : 'Your email'}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white">
                {language === 'fr' ? "S'inscrire" : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {new Date().getFullYear()} CV Creator. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900/50 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" asChild>
                <Link href="mailto:contact@cvcreator.fr" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900/50 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" asChild>
                <Link href="https://github.com/cvcreator" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900/50 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" asChild>
                <Link href="https://linkedin.com/company/cvcreator" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
