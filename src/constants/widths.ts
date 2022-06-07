const PARENT_PERCENT = 4;
const TOTAL_CARD_LENGTH = 4;
const CARD_LENGTH_PER_BOX = 2;
const MARGIN_X = 2;

const WIDTH_CARDS = 100 / PARENT_PERCENT / CARD_LENGTH_PER_BOX;
const WIDTH_PER_CARD =
  (100 / PARENT_PERCENT / TOTAL_CARD_LENGTH) * CARD_LENGTH_PER_BOX;

const WIDTH_EXCEPT_MARGIN = WIDTH_PER_CARD - MARGIN_X;

const widths = {
  bigHeader: { rem: '50' },
  monthCards: { percent: WIDTH_CARDS },
  monthCard: { percent: WIDTH_EXCEPT_MARGIN },
};

export default widths;
