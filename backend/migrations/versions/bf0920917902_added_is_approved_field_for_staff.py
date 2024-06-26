"""Added is approved field for staff

Revision ID: bf0920917902
Revises: b2e981e52062
Create Date: 2024-06-23 14:02:08.593209

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf0920917902'
down_revision = 'b2e981e52062'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('staff', schema=None) as batch_op:
        batch_op.add_column(sa.Column('s_isApproved', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('staff', schema=None) as batch_op:
        batch_op.drop_column('s_isApproved')

    # ### end Alembic commands ###
