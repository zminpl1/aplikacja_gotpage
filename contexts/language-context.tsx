"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "pl" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  pl: {
    // Navigation
    "nav.home": "Strona główna",
    "nav.listings": "Ogłoszenia",
    "nav.businesses": "Firmy",
    "nav.categories": "Kategorie",
    "nav.about": "O nas",
    "nav.login": "Zaloguj się",
    "nav.signup": "Zarejestruj się",

    // Home page
    "home.hero.title": "Znajdź Firmy i Usługi w Twojej okolicy",
    "home.hero.subtitle":
      "Połącz się z lokalnymi firmami, odkryj nowe usługi i przeglądaj ogłoszenia w Twojej okolicy.",
    "home.hero.search": "Szukaj firm, usług lub ogłoszeń...",
    "home.hero.button": "Szukaj",
    "home.categories.title": "Przeglądaj według kategorii",
    "home.featured.title": "Wyróżnione ogłoszenia",
    "home.recent.title": "Najnowsze ogłoszenia",
    "home.cta.title": "Gotowy dołączyć do Gotpage?",
    "home.cta.subtitle": "Utwórz konto, aby dodawać ogłoszenia, łączyć się z firmami lub zarejestrować swoją firmę.",
    "home.cta.user": "Zarejestruj się jako użytkownik",
    "home.cta.business": "Zarejestruj firmę",
    "home.viewall": "Zobacz wszystkie →",

    // Listings page
    "listings.title": "Przeglądaj ogłoszenia",
    "listings.search": "Szukaj ogłoszeń...",
    "listings.filter": "Filtruj",
    "listings.category": "Kategoria",
    "listings.location": "Lokalizacja",
    "listings.all": "Wszystkie ogłoszenia",
    "listings.showing": "Pokazuje",
    "listings.results": "wyników",
    "listings.sort": "Sortuj według",
    "listings.newest": "Najnowsze",
    "listings.oldest": "Najstarsze",
    "listings.price.high": "Cena: od najwyższej",
    "listings.price.low": "Cena: od najniższej",
    "listings.previous": "Poprzednia",
    "listings.next": "Następna",
    "listings.viewdetails": "Zobacz szczegóły",
    "listings.views": "Wyświetlenia",
    "listings.inquiries": "Zapytania",
    "listings.create": "Utwórz ogłoszenie",
    "listings.createFirst": "Utwórz pierwsze ogłoszenie",
    "listings.createNew": "Utwórz nowe ogłoszenie",
    "listings.listingDetails": "Szczegóły ogłoszenia",
    "listings.createDescription":
      "Wypełnij poniższy formularz, aby utworzyć nowe ogłoszenie. Pola oznaczone * są wymagane.",
    "listings.basicInfo": "Podstawowe informacje",
    "listings.title": "Tytuł",
    "listings.titlePlaceholder": "Krótki, opisowy tytuł dla Twojego ogłoszenia",
    "listings.description": "Opis",
    "listings.descriptionPlaceholder": "Szczegółowy opis Twojego ogłoszenia...",
    "listings.selectCategory": "Wybierz kategorię",
    "listings.price": "Cena",
    "listings.locationPlaceholder": "Miasto, dzielnica lub adres",
    "listings.images": "Zdjęcia",
    "listings.uploadImages": "Dodaj zdjęcia",
    "listings.imagesDescription": "Możesz dodać do 10 zdjęć. Pierwsze zdjęcie będzie głównym zdjęciem ogłoszenia.",
    "listings.contactInfo": "Informacje kontaktowe",
    "listings.contactEmail": "Email kontaktowy",
    "listings.contactPhone": "Telefon kontaktowy",
    "listings.contactDescription":
      "Przynajmniej jedna metoda kontaktu jest wymagana. Jeśli nie podasz żadnej, użyjemy danych z Twojego profilu.",
    "listings.options": "Opcje",
    "listings.markAsFeatured": "Oznacz jako wyróżnione",
    "listings.featuredDescription":
      "Wyróżnione ogłoszenia są pokazywane na stronie głównej i na górze wyników wyszukiwania.",
    "listings.termsText": "Akceptuję regulamin serwisu i politykę prywatności",
    "listings.termsLink": "Regulamin",
    "listings.publishListing": "Opublikuj ogłoszenie",
    "listings.requiredFields": "Wypełnij wszystkie wymagane pola",
    "listings.acceptTerms": "Musisz zaakceptować regulamin",
    "listings.createSuccess": "Ogłoszenie zostało utworzone pomyślnie",
    "listings.addNew": "Dodaj nowe ogłoszenie",
    "listings.backToListings": "Powrót do ogłoszeń",
    "listings.notFound": "Ogłoszenie nie zostało znalezione",
    "listings.description": "Opis",
    "listings.reviews": "Opinie",
    "listings.noReviews": "To ogłoszenie nie ma jeszcze opinii",
    "listings.listedBy": "Wystawione przez",
    "listings.viewBusiness": "Zobacz profil firmy",
    "listings.contactAboutListing": "Kontakt w sprawie ogłoszenia",
    "listings.messagePrompt": "Jestem zainteresowany/a tym ogłoszeniem...",
    "listings.sendMessage": "Wyślij wiadomość",
    "listings.save": "Zapisz",
    "listings.saved": "Zapisane",

    // Businesses page
    "businesses.title": "Katalog firm",
    "businesses.search": "Szukaj firm...",
    "businesses.all": "Wszystkie firmy",
    "businesses.showing": "Pokazuje",
    "businesses.results": "wyników",
    "businesses.sort.rating": "Najwyżej oceniane",
    "businesses.sort.reviews": "Najwięcej opinii",
    "businesses.sort.listings": "Najwięcej ogłoszeń",
    "businesses.sort.newest": "Najnowsze",
    "businesses.activelistings": "aktywnych ogłoszeń",
    "businesses.viewbusiness": "Zobacz firmę",

    // Categories
    "category.realestate": "Nieruchomości",
    "category.retail": "Handel detaliczny",
    "category.food": "Gastronomia",
    "category.automotive": "Motoryzacja",
    "category.services": "Usługi profesjonalne",
    "category.beauty": "Uroda i wellness",
    "category.technology": "Technologia",
    "category.corporate": "Korporacyjne",
    "category.accommodation": "Zakwaterowanie",
    "category.transport": "Transport",
    "category.education": "Edukacja",
    "category.entertainment": "Rozrywka",
    "category.listings": "ogłoszeń",

    // Common
    "common.featured": "Wyróżnione",
    "common.verified": "Zweryfikowany",
    "common.allcategories": "Wszystkie kategorie",
    "common.alllocations": "Wszystkie lokalizacje",
    "common.search": "Szukaj",
    "common.language": "Język",
    "common.error": "Błąd",
    "common.success": "Sukces",
    "common.backToHome": "Powrót do strony głównej",
    "common.view": "Zobacz",
    "common.edit": "Edytuj",
    "common.delete": "Usuń",
    "common.promote": "Promuj",
    "common.cancel": "Anuluj",
    "common.contact": "Kontakt",
    "common.message": "Wiadomość",
    "common.reviews": "opinii",

    // Profile
    "profile.user.title": "Profil użytkownika",
    "profile.user.info": "Informacje osobiste",
    "profile.user.listings": "Moje ogłoszenia",
    "profile.user.saved": "Zapisane ogłoszenia",
    "profile.user.messages": "Wiadomości",
    "profile.user.settings": "Ustawienia",
    "profile.user.activity": "Ostatnia aktywność",
    "profile.user.reviews": "Moje opinie",

    "profile.business.title": "Profil firmy",
    "profile.business.info": "Informacje o firmie",
    "profile.business.listings": "Ogłoszenia firmy",
    "profile.business.reviews": "Opinie",
    "profile.business.analytics": "Analityka",
    "profile.business.settings": "Ustawienia firmy",
    "profile.business.messages": "Wiadomości",
    "profile.business.promote": "Promuj firmę",

    "profile.edit": "Edytuj profil",
    "profile.bio": "Bio",
    "profile.contactInfo": "Informacje kontaktowe",
    "profile.accountInfo": "Informacje o koncie",
    "profile.memberSince": "Członek od",
    "profile.activeListings": "Aktywne ogłoszenia",
    "profile.reviewsWritten": "Napisane opinie",
    "profile.noListings": "Nie masz jeszcze żadnych aktywnych ogłoszeń",
    "profile.about": "O firmie",
    "profile.businessHours": "Godziny otwarcia",
    "profile.businessDetails": "Szczegóły firmy",
    "profile.founded": "Założona",
    "profile.employees": "Pracownicy",

    // Auth
    "auth.login": "Logowanie",
    "auth.register": "Rejestracja",
    "auth.loginDescription": "Zaloguj się do swojego konta",
    "auth.registerDescription": "Utwórz nowe konto",
    "auth.email": "Email",
    "auth.password": "Hasło",
    "auth.forgotPassword": "Zapomniałeś hasła?",
    "auth.rememberMe": "Zapamiętaj mnie",
    "auth.loginButton": "Zaloguj się",
    "auth.accountType": "Typ konta",
    "auth.userAccount": "Konto użytkownika",
    "auth.businessAccount": "Konto firmowe",
    "auth.fullName": "Imię i nazwisko",
    "auth.phone": "Telefon",
    "auth.nip": "NIP",
    "auth.nipDescription": "Numer Identyfikacji Podatkowej - wymagany dla firm",
    "auth.confirmPassword": "Potwierdź hasło",
    "auth.acceptTerms": "Akceptuję",
    "auth.termsLink": "regulamin i politykę prywatności",
    "auth.registerButton": "Zarejestruj się",
    "auth.orContinueWith": "lub kontynuuj z",
    "auth.error": "Błąd",
    "auth.allFieldsRequired": "Wszystkie wymagane pola muszą być wypełnione",
    "auth.passwordsDoNotMatch": "Hasła nie są identyczne",
    "auth.businessFieldsRequired": "NIP i telefon są wymagane dla kont firmowych",
    "auth.termsRequired": "Musisz zaakceptować regulamin",
    "auth.success": "Sukces",
    "auth.loginSuccess": "Zalogowano pomyślnie",
    "auth.registerSuccess": "Zarejestrowano pomyślnie",

    // Footer
    "footer.rights": "Wszelkie prawa zastrzeżone",
    "footer.contact": "Kontakt",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.listings": "Listings",
    "nav.businesses": "Businesses",
    "nav.categories": "Categories",
    "nav.about": "About",
    "nav.login": "Log in",
    "nav.signup": "Sign up",

    // Home page
    "home.hero.title": "Find Businesses and Services Near You",
    "home.hero.subtitle": "Connect with local businesses, discover new services, and explore listings in your area.",
    "home.hero.search": "Search businesses, services, or listings...",
    "home.hero.button": "Search",
    "home.categories.title": "Browse by Category",
    "home.featured.title": "Featured Listings",
    "home.recent.title": "Recent Listings",
    "home.cta.title": "Ready to Join Gotpage?",
    "home.cta.subtitle": "Create an account to post listings, connect with businesses, or register your business.",
    "home.cta.user": "Sign Up as User",
    "home.cta.business": "Register Business",
    "home.viewall": "View all →",

    // Listings page
    "listings.title": "Browse Listings",
    "listings.search": "Search listings...",
    "listings.filter": "Filter",
    "listings.category": "Category",
    "listings.location": "Location",
    "listings.all": "All Listings",
    "listings.showing": "Showing",
    "listings.results": "results",
    "listings.sort": "Sort by",
    "listings.newest": "Newest First",
    "listings.oldest": "Oldest First",
    "listings.price.high": "Price: High to Low",
    "listings.price.low": "Price: Low to High",
    "listings.previous": "Previous",
    "listings.next": "Next",
    "listings.viewdetails": "View Details",
    "listings.views": "Views",
    "listings.inquiries": "Inquiries",
    "listings.create": "Create Listing",
    "listings.createFirst": "Create Your First Listing",
    "listings.createNew": "Create New Listing",
    "listings.listingDetails": "Listing Details",
    "listings.createDescription": "Fill out the form below to create a new listing. Fields marked with * are required.",
    "listings.basicInfo": "Basic Information",
    "listings.title": "Title",
    "listings.titlePlaceholder": "Short, descriptive title for your listing",
    "listings.description": "Description",
    "listings.descriptionPlaceholder": "Detailed description of your listing...",
    "listings.selectCategory": "Select category",
    "listings.price": "Price",
    "listings.locationPlaceholder": "City, district, or address",
    "listings.images": "Images",
    "listings.uploadImages": "Upload images",
    "listings.imagesDescription":
      "You can add up to 10 images. The first image will be the main image of your listing.",
    "listings.contactInfo": "Contact Information",
    "listings.contactEmail": "Contact Email",
    "listings.contactPhone": "Contact Phone",
    "listings.contactDescription":
      "At least one contact method is required. If you don't provide any, we'll use your profile information.",
    "listings.options": "Options",
    "listings.markAsFeatured": "Mark as featured",
    "listings.featuredDescription": "Featured listings are shown on the homepage and at the top of search results.",
    "listings.termsText": "I accept the terms of service and privacy policy",
    "listings.termsLink": "Terms of Service",
    "listings.publishListing": "Publish Listing",
    "listings.requiredFields": "Please fill in all required fields",
    "listings.acceptTerms": "You must accept the terms of service",
    "listings.createSuccess": "Listing created successfully",
    "listings.addNew": "Add New Listing",
    "listings.backToListings": "Back to Listings",
    "listings.notFound": "Listing not found",
    "listings.description": "Description",
    "listings.reviews": "Reviews",
    "listings.noReviews": "This listing has no reviews yet",
    "listings.listedBy": "Listed by",
    "listings.viewBusiness": "View Business Profile",
    "listings.contactAboutListing": "Contact about this listing",
    "listings.messagePrompt": "I'm interested in this listing...",
    "listings.sendMessage": "Send Message",
    "listings.save": "Save",
    "listings.saved": "Saved",

    // Businesses page
    "businesses.title": "Business Directory",
    "businesses.search": "Search businesses...",
    "businesses.all": "All Businesses",
    "businesses.showing": "Showing",
    "businesses.results": "results",
    "businesses.sort.rating": "Highest Rated",
    "businesses.sort.reviews": "Most Reviews",
    "businesses.sort.listings": "Most Listings",
    "businesses.sort.newest": "Newest",
    "businesses.activelistings": "active listings",
    "businesses.viewbusiness": "View Business",

    // Categories
    "category.realestate": "Real Estate",
    "category.retail": "Retail",
    "category.food": "Food & Dining",
    "category.automotive": "Automotive",
    "category.services": "Professional Services",
    "category.beauty": "Beauty & Wellness",
    "category.technology": "Technology",
    "category.corporate": "Corporate",
    "category.accommodation": "Accommodation",
    "category.transport": "Transport",
    "category.education": "Education",
    "category.entertainment": "Entertainment",
    "category.listings": "listings",

    // Common
    "common.featured": "Featured",
    "common.verified": "Verified",
    "common.allcategories": "All Categories",
    "common.alllocations": "All Locations",
    "common.search": "Search",
    "common.language": "Language",
    "common.error": "Error",
    "common.success": "Success",
    "common.backToHome": "Back to Home",
    "common.view": "View",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.promote": "Promote",
    "common.cancel": "Cancel",
    "common.contact": "Contact",
    "common.message": "Message",
    "common.reviews": "reviews",

    // Profile
    "profile.user.title": "User Profile",
    "profile.user.info": "Personal Information",
    "profile.user.listings": "My Listings",
    "profile.user.saved": "Saved Listings",
    "profile.user.messages": "Messages",
    "profile.user.settings": "Settings",
    "profile.user.activity": "Recent Activity",
    "profile.user.reviews": "My Reviews",

    "profile.business.title": "Business Profile",
    "profile.business.info": "Business Information",
    "profile.business.listings": "Business Listings",
    "profile.business.reviews": "Reviews",
    "profile.business.analytics": "Analytics",
    "profile.business.settings": "Business Settings",
    "profile.business.messages": "Messages",
    "profile.business.promote": "Promote Business",

    "profile.edit": "Edit Profile",
    "profile.bio": "Bio",
    "profile.contactInfo": "Contact Information",
    "profile.accountInfo": "Account Information",
    "profile.memberSince": "Member since",
    "profile.activeListings": "Active listings",
    "profile.reviewsWritten": "Reviews written",
    "profile.noListings": "You don't have any active listings yet",
    "profile.about": "About",
    "profile.businessHours": "Business Hours",
    "profile.businessDetails": "Business Details",
    "profile.founded": "Founded",
    "profile.employees": "Employees",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.loginDescription": "Sign in to your account",
    "auth.registerDescription": "Create a new account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.forgotPassword": "Forgot password?",
    "auth.rememberMe": "Remember me",
    "auth.loginButton": "Sign in",
    "auth.accountType": "Account Type",
    "auth.userAccount": "User Account",
    "auth.businessAccount": "Business Account",
    "auth.fullName": "Full Name",
    "auth.phone": "Phone",
    "auth.nip": "NIP",
    "auth.nipDescription": "Tax Identification Number - required for business accounts",
    "auth.confirmPassword": "Confirm Password",
    "auth.acceptTerms": "I accept the",
    "auth.termsLink": "terms of service and privacy policy",
    "auth.registerButton": "Sign up",
    "auth.orContinueWith": "or continue with",
    "auth.error": "Error",
    "auth.allFieldsRequired": "All required fields must be filled",
    "auth.passwordsDoNotMatch": "Passwords do not match",
    "auth.businessFieldsRequired": "NIP and phone are required for business accounts",
    "auth.termsRequired": "You must accept the terms of service",
    "auth.success": "Success",
    "auth.loginSuccess": "Logged in successfully",
    "auth.registerSuccess": "Registered successfully",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.contact": "Contact",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("pl")

  useEffect(() => {
    // Set html lang attribute
    document.documentElement.lang = language

    // Store language preference
    localStorage.setItem("language", language)
  }, [language])

  useEffect(() => {
    // Get stored language preference on initial load
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "pl" || storedLanguage === "en")) {
      setLanguageState(storedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

