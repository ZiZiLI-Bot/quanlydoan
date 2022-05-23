/* eslint-disable react/prop-types */
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator';
import React from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

export default function CKPaginator({ total, totalPages, changedPages }) {
  const baseStyles = {
    w: 9,
    fontSize: 'sm',
  };

  const normalStyles = {
    ...baseStyles,
    _hover: {
      bg: 'blackAlpha.300',
    },
    bg: 'blackAlpha.50',
  };

  const activeStyles = {
    ...baseStyles,
    _hover: {
      bg: 'blue.300',
    },
    bg: 'blue.400',
  };

  const separatorStyles = {
    w: 7,
    bg: 'green.100',
  };
  const { pagesQuantity, currentPage, setCurrentPage } = usePaginator({
    total: total,
    initialState: {
      pageSize: totalPages,
      currentPage: 1,
      isDisabled: false,
    },
  });
  return (
    <Paginator
      isDisabled={false}
      activeStyles={activeStyles}
      innerLimit={2}
      currentPage={currentPage}
      outerLimit={2}
      normalStyles={normalStyles}
      separatorStyles={separatorStyles}
      pagesQuantity={pagesQuantity}
      onPageChange={changedPages}
    >
      <Container align='center' justify='space-evenly' w='container.sm' p={4}>
        <Previous>
          <AiOutlineArrowLeft />
        </Previous>
        <PageGroup isInline align='center' />
        <Next>
          <AiOutlineArrowRight />
        </Next>
      </Container>
    </Paginator>
  );
}
