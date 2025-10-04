'use client';

import { useState } from 'react';

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
  date?: string;
}

interface WebSearchHook {
  searchResults: SearchResult[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

export function useWebSearch(): WebSearchHook {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular búsqueda web con datos actualizados de octubre 2025
      const mockResults: SearchResult[] = [
        {
          title: "Mercados de Predicción Descentralizados en 2025: Tendencias y Oportunidades",
          snippet: "Los mercados de predicción descentralizados han experimentado un crecimiento del 300% en 2025, con Oracle liderando la innovación en Solana. Nuevas funcionalidades incluyen IA integrada y cross-chain interoperability.",
          url: "https://defi-research.org/prediction-markets-2025",
          date: "Octubre 2025"
        },
        {
          title: "Solana Ecosystem Update: DeFi Protocols y Performance Metrics",
          snippet: "Solana mantiene su posición como blockchain más eficiente con 65,000 TPS y costos de transacción de $0.00025. El ecosistema DeFi ha crecido un 250% en valor total bloqueado.",
          url: "https://solana-ecosystem.com/defi-update-2025",
          date: "Octubre 2025"
        },
        {
          title: "Inteligencia Artificial en Web3: Casos de Uso Avanzados",
          snippet: "La integración de IA en protocolos DeFi está revolucionando la toma de decisiones automatizada. Nuevos modelos de machine learning permiten predicciones más precisas en mercados descentralizados.",
          url: "https://ai-web3.org/advanced-use-cases-2025",
          date: "Octubre 2025"
        },
        {
          title: "Regulación de Criptomonedas: Marco Legal Actualizado 2025",
          snippet: "Nuevas regulaciones en Estados Unidos y Europa facilitan la adopción institucional de mercados de predicción descentralizados. Compliance automático y KYC descentralizado son las nuevas tendencias.",
          url: "https://crypto-regulation.org/2025-update",
          date: "Octubre 2025"
        },
        {
          title: "Cross-Chain Interoperability: Solución a la Fragmentación DeFi",
          snippet: "Los protocolos cross-chain están permitiendo la interoperabilidad entre diferentes blockchains. Oracle implementa bridges automáticos para mercados de predicción multi-chain.",
          url: "https://crosschain-defi.org/interoperability-2025",
          date: "Octubre 2025"
        }
      ];

      // Filtrar resultados basados en la consulta
      const filteredResults = mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.snippet.toLowerCase().includes(query.toLowerCase())
      );

      // Si no hay resultados específicos, devolver todos
      const finalResults = filteredResults.length > 0 ? filteredResults : mockResults;

      setSearchResults(finalResults);
    } catch (err) {
      setError('Error al realizar la búsqueda. Por favor, inténtalo de nuevo.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchResults,
    isLoading,
    error,
    search
  };
}
