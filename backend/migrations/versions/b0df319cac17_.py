"""empty message

Revision ID: b0df319cac17
Revises: fa651e5737e0
Create Date: 2024-07-12 23:12:52.896001

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b0df319cac17'
down_revision = 'fa651e5737e0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('inventory_items', schema=None) as batch_op:
        batch_op.drop_column('item_image')
        batch_op.drop_column('item_image_url')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('inventory_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('item_image_url', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('item_image', postgresql.BYTEA(), autoincrement=False, nullable=True))

    # ### end Alembic commands ###
